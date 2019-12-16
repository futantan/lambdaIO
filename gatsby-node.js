const path = require('path')

const allTagsIndexTemplate = path.resolve('src/templates/AllTagsIndex.jsx')
const singleTagIndexTemplate = path.resolve('src/templates/SingleTagIndex.jsx')
const blogPostTemplate = path.resolve('src/templates/BlogPost.jsx')

const createTagsPage = (createPage, tags) => {
  createPage({
    path: '/blog/tags',
    component: allTagsIndexTemplate,
    context: { tags: tags.sort() },
  })
}

const createSingleTagPage = (createPage, tagName, posts) => {
  createPage({
    path: `/blog/tags/${tagName}`,
    component: singleTagIndexTemplate,
    context: { posts, tagName },
  })
}

const createTagPages = (createPage, posts) => {
  const postsByTag = posts.reduce((prev, { node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        prev[tag] = (prev[tag] || []).concat(node)
      })
    }
    return prev
  }, {})

  const tags = Object.keys(postsByTag)
  createTagsPage(createPage, tags)
  tags.forEach(tagName =>
    createSingleTagPage(createPage, tagName, postsByTag[tagName])
  )
}

const createSinglePost = (createPage, posts, index) => {
  const path = posts[index].node.frontmatter.path
  createPage({
    path: `blog/${path}`,
    component: blogPostTemplate,
    context: {
      pathSlug: path,
      prev: index === 0 ? null : posts[index - 1].node,
      next: index === posts.length - 1 ? null : posts[index + 1].node,
    },
  })
}

const pagesQuery = `
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            path
            title
            tags
          }
        }
      }
    }
  }
`

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(pagesQuery).then(result => {
    const posts = result.data.allMarkdownRemark.edges
    createTagPages(createPage, posts)
    posts.forEach((_, index) => createSinglePost(createPage, posts, index))
  })
