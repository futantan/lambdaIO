import React from 'react'
import Header from '../components/Header'
import { graphql, Link } from 'gatsby'

const Index = props => {
  const { edges } = props.data.allMarkdownRemark
  return (
    <>
      <Header />
      {edges.map(edge => {
        const { frontmatter } = edge.node
        return (
          <div key={frontmatter.path}>
            <Link to={`blog/${frontmatter.path}`}>{frontmatter.title}</Link>
          </div>
        )
      })}
      <div>
        <Link to={'/blog/tags'}>Browse by Tag</Link>
      </div>
    </>
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
