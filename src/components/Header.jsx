import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Profile from './Profile'
import styles from './Header.module.css'

const TitleAndDescription = ({ data }) => {
  const title = data.site.siteMetadata.title

  return (
    <header>
      <h1 className={styles.title}>{title}</h1>
      <Profile />
    </header>
  )
}

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
    render={data => <TitleAndDescription data={data} />}
  />
)

export default Header
