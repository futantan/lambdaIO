import React from 'react'
import { graphql, Link } from 'gatsby'
import dayjs from 'dayjs'
import SEO from '../components/SEO'

const Index = props => {
  const { edges } = props.data.allMarkdownRemark
  return (
    <>
      <SEO />
      {edges.map(edge => {
        const {
          frontmatter: { path, title, date },
        } = edge.node
        return (
          <div key={path} className="sm:flex items-center mb-4">
            <div className="mr-3 font-mono text-xs text-gray-500">
              {dayjs(date).format('MMM d, YYYY')}
            </div>
            <Link to={`/blog/${path}`}>{title}</Link>
          </div>
        )
      })}
      <div>{/*<Link to={'/blog/tags'}>Browse by Tag</Link>*/}</div>
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
            date
          }
        }
      }
    }
  }
`
export default Index
