import React from "react";
import { graphql, Link } from "gatsby";
import "katex/dist/katex.min.css"
import SEO from "../components/SEO";
import { Disqus } from 'gatsby-plugin-disqus'

const Template = props => {
  const { markdownRemark } = props.data
  const { prev, next } = props.pageContext
  const { title, desc, path } = markdownRemark.frontmatter
  const html = markdownRemark.html

  const disqusConfig = {
    identifier: path,
    title: title,
  }

  return (
    <>
      <SEO title={title} description={desc} />
      <main>
        <h1>{title}</h1>
        <div
          className="blogpost"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            fontFamily: 'avenir',
          }}
        />
        <div className='flex justify-between'>
          {prev && <Link to={'blog/' + prev.frontmatter.path}>上一篇</Link>}
          {next && <Link to={'blog/' + next.frontmatter.path}>下一篇</Link>}
        </div>
      </main>

      <Disqus config={disqusConfig} />
    </>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        desc
        path
      }
    }
  }
`

export default Template
