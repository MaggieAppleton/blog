/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Flex } from 'theme-ui'
import Layout from '../components/note-layout'
import { graphql } from 'gatsby'
import PostList from '../components/post-list'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import isEmpty from 'lodash/isEmpty'
import includes from 'lodash/includes'
import some from 'lodash/some'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import { useThemeUI } from 'theme-ui'

const getTopicsFromNotes = (noteNodes) =>
  noteNodes.reduce(
    (topics, { node: note }) => {
      const newGrowth = get(
        note,
        'childMdx.frontmatter.growthStage',
        'Seedling'
      )
      let newTopics = get(note, 'childMdx.frontmatter.tags', [])
      if (!newTopics || !isArray(newTopics)) {
        newTopics = []
      }
      return {
        growthFilters: compact(uniq([...topics.growthFilters, newGrowth])),
        topicFilters: sortBy(
          compact(uniq([...topics.topicFilters, ...newTopics]))
        ),
      }
    },
    { growthFilters: [], topicFilters: [] }
  )

const useTopicFilters = (notes) => {
  const filters = getTopicsFromNotes(notes)
  const [activeFilters, setActiveFilters] = React.useState([])

  // Handle filter
  const handleFilterClick = (filter, options) => {
    const clearFilters = get(options, 'clearFilters', [])
    let newActiveFilters

    if (includes(activeFilters, filter)) {
      newActiveFilters = activeFilters.filter((f) => f !== filter)
    } else {
      newActiveFilters = activeFilters.concat(filter)
    }

    if (!isEmpty(clearFilters)) {
      clearFilters.forEach((f) => {
        newActiveFilters = newActiveFilters.filter(
          (activeFilter) => f !== activeFilter
        )
      })
    }

    setActiveFilters(newActiveFilters)
  }

  const displayedNotes = notes.filter(({ node: note }) => {
    const matchesBoth = activeFilters.reduce(
      (acc, current) => {
        return {
          growth: acc.growth || includes(filters.growthFilters, current),
          tags: acc.tags || includes(filters.topicFilters, current),
        }
      },
      { growth: false, tags: false }
    )

    const matchesGrowth = includes(
      activeFilters,
      note.childMdx.frontmatter.growthStage
    )
    const matchesTopic = some(note.childMdx.frontmatter.tags, (t) =>
      includes(activeFilters, t)
    )

    if (matchesBoth.growth && matchesBoth.tags) {
      return matchesGrowth && matchesTopic
    }

    return isEmpty(activeFilters) || matchesTopic || matchesGrowth
  })

  return { filters, activeFilters, displayedNotes, handleFilterClick }
}

function TopicFilters({ activeFilters, filters, handleFilterClick }) {
  const { theme } = useThemeUI()
  return (
    <div sx={{ variant: 'styles.filterSection' }}>
      <div sx={{ variant: 'styles.topicFilter' }}>
        {filters.topicFilters.map((filter) => {
          return (
            <div
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFilterClick(filter)
                }
              }}
              onClick={() => handleFilterClick(filter)}
              sx={{
                padding: '0.2em 0.5em',
                margin: '2px',
                borderRadius: '6px',
                color: includes(activeFilters, filter) ? 'white' : 'gray',
                transition: 'all 200ms ease-in-out',
                ':hover': {
                  border: `1px solid gray`,
                  borderColor: 'gray',
                  color: includes(activeFilters, filter) ? 'white' : 'darkGray',
                  cursor: 'pointer',
                },
                border: includes(activeFilters, filter)
                  ? `1px solid ${theme.colors.gray}`
                  : `1px solid  ${theme.colors.lightGray}`,

                background: includes(activeFilters, filter)
                  ? 'gray'
                  : 'inherit',
              }}
            >
              {filter}
            </div>
          )
        })}
      </div>
      <div sx={{ variant: 'styles.growthFilter' }}>
        {filters.growthFilters.map((filter) => {
          return (
            <div
              onClick={() =>
                handleFilterClick(filter, {
                  clearFilters: filters.growthFilters.filter(
                    (f) => f !== filter
                  ),
                })
              }
              sx={{
                padding: '0.2em 0.5em',
                margin: '2px',
                borderRadius: includes(activeFilters, filter) ? '6px' : '0px',
                color: includes(activeFilters, filter) ? 'white' : 'orange',
                transition: 'all 300ms ease-in-out',
                ':hover': {
                  transition: 'all 300ms ease-in-out',
                  borderBottom: `2px solid orange`,
                  color: includes(activeFilters, filter) ? 'white' : 'orange',
                  cursor: 'pointer',
                },
                borderBottom: includes(activeFilters, filter)
                  ? `2px solid  ${theme.colors.orange}`
                  : `2px solid ${theme.colors.orange}`,
                background: includes(activeFilters, filter)
                  ? 'orange'
                  : 'inherit',
              }}
            >
              {filter}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Articles({ data: { allBrainNote } }) {
  const { theme } = useThemeUI()
  // Set up topic and growthStage filters
  const {
    filters,
    activeFilters,
    handleFilterClick,
    displayedNotes,
  } = useTopicFilters(allBrainNote.edges)

  return (
    <Layout>
      <Disclosure>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Styled.h1>Articles</Styled.h1>
          <DisclosureButton
            sx={{
              background: 'none',
              height: 25,
              color: 'lightGray',
              fontSize: 2,
              letterSpacing: 2,
              border: 'none',
              ':hover': {
                color: 'gray',
                borderBottom: `2px solid ${theme.colors.gray}`,
                cursor: 'pointer',
              },
            }}
          >
            Filter
          </DisclosureButton>
        </Flex>
        <DisclosurePanel>
          <TopicFilters
            filters={filters}
            activeFilters={activeFilters}
            handleFilterClick={handleFilterClick}
          />
        </DisclosurePanel>
        <PostList posts={displayedNotes} />
      </Disclosure>
    </Layout>
  )
}

export default Articles

export const pageQuery = graphql`
  query ArticlesQuery {
    allBrainNote(sort: { fields: [title], order: DESC }) {
      edges {
        node {
          slug
          title
          childMdx {
            frontmatter {
              growthStage
              tags
            }
          }
        }
      }
    }
  }
`
