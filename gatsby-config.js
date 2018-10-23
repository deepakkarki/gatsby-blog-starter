module.exports = {

  siteMetadata: {
    title: 'Portfolio',
    navLinks: {
      home : "/",
      blog : "/blog/",
      about : "/about/"
    }
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    // `gatsby-mdx`, //- doesn't work :( 
  ],
}
