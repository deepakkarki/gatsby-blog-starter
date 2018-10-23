const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  return generateFromMD(graphql, actions.createPage)
}

function generateFromMD(graphql, createPage){
  return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
    })
}


/*
NOTE: `generateFromMDX` is not used as of now, due to this stupid warning message.

warning The GraphQL query in the non-page component "/Users/deepakkarki/Desktop/portfolio/src/templates/mdx-post.js" will not be run.
Exported queries are only executed for Page components. Instead of an exported query, either co-locate a GraphQL fragment and compose that fragment into the query (or other fragment) of the top-level page that renders this component, or use a <StaticQuery> in this component. For more info on fragments and composition, see http://graphql.org/learn/queries/#fragments and for more information on <StaticQuery>, see https://gatsbyjs.org/docs/static-query

Apparently this warning should come in when a template is never used, 
and even though I did use it in gatsby-node.js, it doesn't seem to recognise, I guess mostly because
the stupid plugin auto processes anything under pages/, so if I move the mdx file to components, there is no problem

*/

function generateFromMDX(graphql, createPage){
  return graphql(`
      {
        allMdx {
          edges {
            node {
              code {
                scope
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMdx.edges.forEach(({ node }) => {
        console.log("== Creating page ==", node) // this is called, still get warning :(
        // and the page rendered is not with my template, just vanilla mdx rendering of the plugin
        createPage({
          path: node.fields.slug,
          component: componentWithMDXScope(
            path.resolve(`./src/templates/mdx-post.js`),
            node.code.scope
          ),
          context: {
            slug: node.fields.slug,
          }
        })
      })
    })
}
