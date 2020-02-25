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
  const postsByTag = posts.reduce((prev, node) => {
    if (node.tags) {
      node.tags.forEach(tag => {
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
  const path = posts[index].path
  createPage({
    path: `blog/${path}`,
    component: blogPostTemplate,
    context: {
      pathSlug: path,
      prev: index === 0 ? null : posts[index - 1],
      next: index === posts.length - 1 ? null : posts[index + 1],
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
    allPosts(
      sort: { order: DESC, fields: date }
      filter: { status: { eq: "published" } }
    ) {
      edges {
        node {
          path
          tags
          title
          date
        }
      }
    }
  }
`

exports.createPages = ({ graphql, actions: { createPage } }) =>
  graphql(pagesQuery).then(result => {
    const mdPosts = result.data.allMarkdownRemark.edges.map(
      v => v.node.frontmatter
    )
    const notionPosts = result.data.allPosts.edges.map(v => v.node)
    const posts = notionPosts.concat(mdPosts)

    createTagPages(createPage, posts)
    posts.forEach((_, index) => createSinglePost(createPage, posts, index))
  })
