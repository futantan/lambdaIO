import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout/Layout'

const AllTagsTemplate = ({ pageContext }) => {
  const { tags } = pageContext
  return (
    <Layout>
      <div>
        <ul>
          {tags.map((tagName, index) => (
            <li key={index}>
              <Link to={`tags/${tagName}`}>{tagName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default AllTagsTemplate
