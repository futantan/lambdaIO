import React from 'react'
import Header from '../components/Header'
import { graphql, Link } from 'gatsby'
import Layout from '../layout/Layout'

const Index = props => {
  const { edges } = props.data.allMarkdownRemark
  return (
    <Layout>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node
        return (
          <div key={frontmatter.path}>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
          </div>
        )
      })}
      <div>
        <Link to={'/tags'}>Browse by Tag</Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            path
            tags
            title
          }
        }
      }
    }
  }
`
export default Index
