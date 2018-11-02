module.exports = {

  siteMetadata: {
    title: `DiscoverDev`,
    siteUrl:`http://localhost:8000`,
    description:`This is a website`,
    navItems: [
      {name: "Home", url: "/"},
      {name: "About", url: "/about"},
      {name: "Blog", url: "/blog"},
    ],
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

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
            }
          }
        ]
      }
    },

    `gatsby-plugin-sitemap`,

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },

    `gatsby-mdx`, //- doesn't work :( 

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {
                    frontmatter: { published: { eq: true }, type: {ne: "page"} }
                    fileAbsolutePath: {regex: "${__dirname}/src/pages/blog//"}
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog/rss.xml",
            title: "Blog RSS Feed",
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {
                    frontmatter: { published: { eq: true }, type: {ne: "page"} }
                    fileAbsolutePath: {regex: "${__dirname}/src/pages/blog2//"}
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/blog2/rss.xml",
            title: "Blog2 RSS Feed",
          },
        ],
      },
    },
  ],
}
