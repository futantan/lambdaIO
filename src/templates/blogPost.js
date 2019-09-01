import React from 'react'
import { graphql, Link } from 'gatsby'

const Template = props => {
  console.log(props)
  const { markdownRemark } = props.data
  const { prev, next } = props.pageContext
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  return (
    <>
      <h1>{title}</h1>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontFamily: 'avenir',
        }}
      />
      {next && <Link to={next.frontmatter.path}>Next</Link>}
      {prev && <Link to={prev.frontmatter.path}>Prev</Link>}
    </>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template
