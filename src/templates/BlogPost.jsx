import React from 'react'
import { graphql, Link } from 'gatsby'

const Template = props => {
  const { markdownRemark } = props.data
  const { prev, next } = props.pageContext
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  return (
    <>
      <h1>
        <Link to="/">lambdaIO</Link>
      </h1>
      <main>
        <h1>{title}</h1>
        <div
          className="blogpost"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            fontFamily: 'avenir',
          }}
        />
        {next && <Link to={'blog/' + next.frontmatter.path}>Next</Link>}
        {prev && <Link to={'blog/' + prev.frontmatter.path}>Prev</Link>}
      </main>
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
