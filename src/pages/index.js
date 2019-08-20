import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => <div>{data.site.siteMetadata.title}</div>}
  />
)

const IndexPage = () => (
  <Container>
    Hello world!
    <Header />
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default IndexPage
