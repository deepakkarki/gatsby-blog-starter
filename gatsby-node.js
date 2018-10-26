const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const {siteMetadata} = require('./gatsby-config.js')

let BC = siteMetadata.blogConfig

/**

 URL schemes
 ===========

 * /blog/ --> index page for the blog. (a .js file - auto converted)
    This will have the overall listing of the series, categories, posts, etc.
    This needs the posts & pages, series & categories (with thier posts under them)
    Pages are markdown (or .js?)  files which are not posts, i.e. they don’t appear in the feed.
    Posts are... well, blog posts that is supposed to appear in the feed.
    The series variable will hold the series under this sub blog along with the posts belonging to each series.


 * /blog/posts --> index page for the blog post listing
    This needs to display all the posts within the sub-blog. Also support pagination.
 * /blog/posts/2 --> pagination of the blog post listing
 * /blog/posts/pname --> a specific blog post


 * /blog/series --> index page of all the series in the (sub)blog
    Needs all series and all the posts under each series. Also do pagination.
 * /blog/series/sname --> listing of all the posts in this series
 * /blog/series/sname/2 --> (optional) pagination of the listing in a series
 * /blog/series/sname/pname --> a specific blog post


 * /blog/categories --> index page for the category 
    Needs all the categories in the sub blog and posts in the categories
 * /blog/categories/cname --> listing of all posts in this category
 * /blog/categories/cname/2 --> pagination of the listing in a category


 MarkDown 
 ========

 For the markdown use custom element support (at least <a> --> <Link> for internal links)
 - https://using-remark.gatsbyjs.org/custom-components/ (look at the caveats)
 - https://prestonrichey.com/blog/react-in-markdown/ (look at <hidden/>)

 Each markdown page will contain the type and layout.
  * type => page or post or meta. Files marked as post appear in the stream
            meta files are index.md's that are used for pagination metadata
  * layout => which ever template is to be applied
  * render => True or False. True by default. If false, not rendered
    by the general markdownRemark processing `generateFromMD()`
    Think of this as data to be consumed while rendering index pages 
    of blog posts, series and categories - not rendered standalone.
  * published => True or False.


 Collections (TODO)
 ===========

 What I haven't tackled is collections (kinda like in jekyll) where it is all related
 but unlike a blog post / series. 
 Eg. projects I've built, book reviews, etc. Can't assign a category since it's not 
      part of the blog stream, nor is it just "pages". (like /about, /contact)

 */

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  /*

   Need to add some more metadata to the nodes so querying becomes easier.
   (maybe fileType - page or post, blog name, etc)

  */

  if (node.internal.type === `MarkdownRemark`) {
    // as of now the slug mirrors the filesystem, but ideally I should pick this up 
    //  from the config. Custom url schemes and what not.
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}


/*

 Page Creation
 =============

 So now this should mirror the output of the URLs I expect.
 * all posts - do the standard markdown remark processing for all .md nodes.

 * /blog/ - create the index page. => auto since it's .js files. (better have js
    files rather than template, as you can customise the UI per sub-blog)
    this will have to do the query for posts, pages, series, collection itself.
 * /blog/(page) - like /about, /contact and stuff - this should be done via the
    standard markdown remark rendering I will be doing.

 * blog/posts/[n] - this I have to paginate, filter the nodes via query and then
    send them to templates/post-index.js, do this in a loop (posts/2, /3, etc)
    Can I somehow add some specific data to be rendered (at top or whatever?)
 * blog/posts/pname - this is should be part of the generic markdown remark processing.

 * blog/series - This will be an index.js file just like blog's index.js. Again, 
   just run the query inside the .js file. Or have template/series-index.js?
   Could come in handy for future pagination if required.
 * blog/series/sname/[n] - this is again paginated. So again loop and render a template file
    Again worth noting if I can have an index.md file or something that can add specific
    data or context to the page being rendered. (explaining a bit about the series)
    (XXX : actually this isn't required? how many posts can there be in a series anyway)
 * blog/series/sname/pname - this should be part of the generic markdown remark processing

 * /blog/categories - Again this will be an index.js file, query what it needs.
 * /blog/categories/cname/[n] - pagination. Loop and render a template file.
    again, would be good if I can have a little custom data per category. 

  NOTE : In case of custom data for paginated entries, I can't have an index.md file,
  eg. "blog/categories/systems/index.md" as this will be rendered during markdownRemark
  processing. So unless I deal with this somehow during 'onCreateNode', this will be a mess.
  Other alternative is that I can have this in the site metadata.

  Never mind, this "blog/categories/systems/index.md" file just needs to mark 
  "render : false" in it's frontmatter. See "MarkDown" section in the top comment.

*/

exports.createPages = ({ graphql, actions }) => {

  let createPage = actions.createPage
  // Standard processing of markdownRemark nodes
  let p1 = generateFromMD(graphql, createPage)
  // return p1
  
  // generate paginated blog index. "blog/posts/[n]"
  let p2 = generateBlogPostsIndex(graphql, createPage)
  return Promise.all([p1, p2])

  // paginated post index for each series. "blog/series/sname/[n]"
  let p3 = generateSeriesPostsIndex(graphql, createPage)

  // paginated post index for each category. "/blog/categories/cname/[n]"
  let p4 = generateCategoryPostsIndex(graphql, createPage)

  return Promise.all([p1, p2, p3, p4])
}



function generateFromMD(graphql, createPage){
  return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter{
                layout
                published
                render
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        let fm = node.frontmatter || {}
        let layout = fm.layout || 'blog-post.js'

        // Filter this in the graphql query itself
        if(fm.published && (fm.render != false)){
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/${layout}`),
            context: {
              slug: node.fields.slug,
            },
          })
        }
      })
    })
}


/*
  blog/index.js auto generates /blog/. This function generates "/blog/posts/[n]"
  for each blog (defined in gatsby-config.siteMetadata)
*/
function generateBlogPostsIndex(graphql, createPage){

  //Query the siteMetadata for the blogs, For each blog -
  let prArray = [] //the promise array
  BC.forEach((blog) =>{
    // query all the markdown in it's children folder with -
    // render!=false, publish=true, type=post

    //RegEx cant end without '/', it interprets "blog" as a flag
    // like \foo.bar/g\ where 'g' is the flag
    // Never mind, it needs 2 "/" at the end. Sigh. :'(
    let blogPath = `${__dirname}/src/pages/${blog.path}/`
    let filePath = `${blogPath}posts/index.md`

    let task = graphql(`
      {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {regex: "${blogPath}/"}
            frontmatter:{
              render: {ne : false}
              published: {eq : true}
              type: {ne: "page"}
            }
          }
        ){
          totalCount
        }

        markdownRemark(
          fileAbsolutePath :{eq:"${filePath}"}
        ){
          id
          frontmatter {
            layout
            postsPerPage
          }
          fields{
            slug
          }
        }
      }
    `)
    .then(result => {
      let {allMarkdownRemark, markdownRemark} = result.data
      let layout = markdownRemark.frontmatter.layout || "blog-posts-index.js"
      let postsPerPage = markdownRemark.frontmatter.postsPerPage || 3
      let numPages = Math.ceil(allMarkdownRemark.totalCount/ postsPerPage)
      let slug = markdownRemark.fields.slug

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? slug : `${slug}${i + 1}`,
          component: path.resolve(`./src/templates/${layout}`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            blogPath: blogPath+'/', //apparently you need this :( or it matches 'blog' and 'blog2'
            filePath
          },
        })
      })
    })

    prArray.push(task)
  })

  return Promise.all(prArray)

}


/*
  series/index.js auto generates /blog/series/. This function generates
  "/blog/series/sname/[n]" for each blog (defined in siteMetadata)
*/
function generateSeriesPostsIndex(graphql, createPage){

//Query the siteMetadata for the blogs, For each blog -

  //  query all the markdown in it's blog/series folder
  //    with render!=false, publish=true, type=post
  //    sort the post by date
  //  output : list of series with children (posts in each series).
  //    similar to series/index.js

  //  query for the blog/series/sname/index.md - get it's content, frontmatter
  //    (perhaps use posts per page, etc from here?)

  //  For each series of the current sub-blog
  //    Figure out how many pages there should be, generate the pages
  //    in a loop using (frontmatter.layout || "template/series-posts-index.js")
  //    

}

/*
  caregories/index.js auto generates /blog/series/. This function generates
  "/blog/categories/cname/[n]" for each blog (defined in siteMetadata)
*/
function generateCategoryPostsIndex(graphql, createPage){

//Query the siteMetadata for the blogs, and for each blog -

  //  query all the markdown files in the sub folders
  //    with render!=false, publish=true, type=post
  //    sort the post by date
  //  output : list of categories in the current blog with their children.
  //    similar to categories/index.js (?)

  //  query for the blog/categories/cname/index.md - get it's content, frontmatter
  //    Shoud this even EXIST?

  //  For each series of the current sub-blog
  //    Figure out how many pages there should be, generate the pages in a loop
  //    using (frontmatter.layout || "template/categories-posts-index.js")
  //    

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
