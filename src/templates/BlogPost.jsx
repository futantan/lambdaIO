import React from "react";
import { graphql, Link } from "gatsby";
import "katex/dist/katex.min.css"
import SEO from "../components/SEO";
import { DiscussionEmbed } from "disqus-react"

const Template = props => {
  const { markdownRemark } = props.data
  const { prev, next } = props.pageContext
  const { title, desc, path } = markdownRemark.frontmatter
  const html = markdownRemark.html

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: path, title },
  }
  console.log(disqusConfig)
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

      <DiscussionEmbed {...disqusConfig} />
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
