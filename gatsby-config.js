module.exports = {

  siteMetadata: {
    title: 'Portfolio',
    navLinks: {
      home : "/",
      blog : "/blog/",
      about : "/about/"
    },
    blogConfig: [
      {
        name : "blog #1",
        //relative to "/src/pages/"
        path: "blog",

        //apparently gatsby *sucks* at querying filesystem
        // so need to list the series myself
        series:[
          "js30",
          "jsFoo"
        ]
      },
      {
        name : "blog #2",
        path: "blog2"
      }
    ],
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
