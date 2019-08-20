module.exports = {
  siteMetadata: {
    title: "My Blog",
    description: "This is my cool blog.",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/blog`,
      },
    },
  ],
}
