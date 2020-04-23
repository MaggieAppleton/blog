import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../../components/posts-layout"
import PostList from "../../components/post-list"

export default ({ data }) => (
  <Layout title="Posts" titleTagName="h1">
    <Helmet title="Posts" />
    <PostList posts={data.allBlogPost.edges} />
  </Layout>
)
