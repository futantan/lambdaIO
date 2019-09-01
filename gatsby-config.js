module.exports = {
  siteMetadata: {
    title: 'My Blog',
    description: 'This is my cool blog.',
  },
  plugins: [
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: `${__dirname}/src/layout/Layout.jsx`,
      },
    },
  ],
}
