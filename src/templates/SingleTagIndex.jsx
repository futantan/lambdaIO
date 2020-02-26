import React from "react";
import { Link } from "gatsby";

const SingleTagIndex = ({ pageContext }) => {
  const { posts, tagName } = pageContext
  return (
    <>
      <div>Posts about {`${tagName}`}</div>
      <div>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <Link to={post.path}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SingleTagIndex
