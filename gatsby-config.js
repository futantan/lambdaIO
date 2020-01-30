module.exports = {
  siteMetadata: {
    title: '傅坦坦的个人博客',
    description: '傅坦坦的个人博客',
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          { resolve: `gatsby-remark-prismjs` },
          { resolve: `gatsby-remark-images` },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'pages', path: `${__dirname}/src/blog` },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: { component: `${__dirname}/src/layout/Layout.jsx` },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: { pathToConfigModule: 'src/utils/typography' },
    },
  ],
}
