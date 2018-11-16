module.exports = {

  siteMetadata: {
    title: `DiscoverDev`,
    siteUrl:`http://localhost:8000`,
    description:`Discover Dev`,
    navItems: [
      {name: "Archive", url: "/archive"},
      {name: "Tags", url: "/tags"},
      {name: "About", url: "/about"},
      {name: "Blog", url: "/blog"},
      {name: "Subscribe", url: "/subscribe"},
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `../links/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tags`,
        path: `../tags/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
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
              return allMarkdownRemark.edges.map(({node}) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.desc || node.excerpt,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
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
            serialize: ({ query: { site, allLinksJson } }) => {
              return allLinksJson.edges.map(({node}) => {
                return Object.assign({}, {
                  title: `DiscoverDev links for ${node.date}`,
                  //TODO - should I call LinkList for desc or in custom element?
                  description: `Curated links for <a href="${site.siteMetadata.siteUrl + `/archive/${node.date}`}" ${node.date} </a>`,
                  url: site.siteMetadata.siteUrl + `/archive/${node.date}`,
                  guid: site.siteMetadata.siteUrl + node.date,
                  custom_elements: [{ "content:encoded": LinkList(node.links)}],
                })
              })
            },
            query: `
              {
                allLinksJson(
                limit: 50
                sort: {fields :[date], order:DESC}
              ){
                edges{
                  node{
                    date
                    links{
                      title
                      domain
                      tags
                      url
                    }
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "DiscoverDev RSS Feed",
          }
        ],
      },
    },
  ],
}


const LinkList = (links) => (
  `<ul>
    ${links.map(link =>(
      `<li>
        <h3>
          <a href=${link.url} target="_blank">${link.title}</a>
        </h3>
        <span> <i>(${link.domain})</i> </span>
        <p>
          ${
            link.tags.map(tag => (
              `<span><i>#${tag}</i></span>`
            ))
          }
        </p>
      </li>`
    ))}
  </ul>`
)
