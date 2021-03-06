import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import PostGrid from "../../components/post-grid/post-grid"
import MiniNewsletter from "../../components/newsletter/mini-newsletter"
import styles from "./index.module.css"

/*
TODO

Do these after I have a bunch of posts to post. Infact even the categories 
 section can be removed for now. (No point having 1 or 2 posts/category)

- As of now I'm listing posts and series (with posts under them) and 
  categories (with posts under them). But this is probably a bit to noisy.

- Either I need to have the series and categories section to just list out
  few of the main series and categories with the description (no posts)
  OR make a horizontal scroll to show the posts (for smaller screens).
  Or BOTH. Let posts, the series and categories all appear horizontally.

- Making the horizontal scroll was a problem for some reason. It just bleads
  out of the horizontal borders and I can't even scroll, it just cuts it off.
  This happend though only until 800px after which it works fine. ¯\_(ツ)_/¯
  (I've had this problem before, solved by "align-items:unset" @ 800px)
  This is a weird bug, and I still don't understand. removing justify-content
  to `.bodyWrapper` seems to fix the unscrollable issue though, but still the
  whole page scrolls, not just the horizontal area. But setting overflow:auto
  for the `.bodyWrapper` fixes the issue! Makes no sense :(
  I Should just re-learn Flexbox, overflow and other CSS stuff properly
  and retry.

ALSO NOTE : Should not have more than 12 categories. 
Actually it will turn out to be more. Keep it high level : 
  data-science, kernel/lowlevel, hardware, security, javascript, frontend, 
  distributed-systems, DBMS, "compilers+runtime", backend, devops, networking

I believe keeping it high level would help me list it out better, having more 
articles under each category + have good descriptions. But it won't be easy.
*/ 

export default ({ data }) => {
  let postNodes = data.allPosts.edges.map( edge => edge.node )
  let js30Nodes = data.js30.edges.map( edge => edge.node )
  let twoBitNodes = data.twoBit.edges.map( edge => edge.node )
  let wpBookNodes = data.wpBook.edges.map( edge => edge.node )
  /* 
  Keep this for later, as of now I don't know a good way to present categories
  Maybe have a bunch of categories with atleast > 6 posts? OR
  Just list the categories with description (instead of the category posts)?

  let categories = data.allCategories.group.map(category => {
    if(category.fieldValue === 'undefined'){ 
      category.fieldValue = 'uncategorized'
    }
    return category
  })
  */

  return (
    <Layout sidebar={false} wide={true}>
      <div>
        <h1 className={styles.title}>Blog @ DiscoverDev</h1>
        <nav className={styles.nav}>
          <Link className={styles.navItem} to="/blog/posts">Posts</Link>
          <span className={styles.navSep}>/</span>
          <Link className={styles.navItem} to="/blog/series">Series</Link>
          <span className={styles.navSep}>/</span>
          <Link className={styles.navItem} to="/blog/categories">Categories</Link>
        </nav>
        <h2 className={styles.subTitle}>Latest Posts</h2>
        <PostGrid posts={postNodes}/>
        <h3 className={styles.seeMore}><Link to="/blog/posts">See all posts in the blog &rarr;</Link></h3>
        <MiniNewsletter className={styles.newsletter}/>

        <h2 className={styles.subTitle}>JS30 Series</h2>
        <PostGrid posts={js30Nodes}/>
        <h3 className={styles.seeMore}><Link to="/blog/series/js30">See all posts in this series &rarr;</Link></h3>

        <h2 className={styles.subTitle}>Two Bit History</h2>
        <PostGrid posts={twoBitNodes}/>
        <h3 className={styles.seeMore}><Link to="/blog/series/2bithistory">See all posts in this series &rarr;</Link></h3>

        <h2 className={styles.subTitle}>The Story of WordPress</h2>
        <PostGrid posts={wpBookNodes}/>
        <h3 className={styles.seeMore}><Link to="/blog/series/wpbook">See all posts in this series &rarr;</Link></h3>


        {/* Maybe have categories if there are more than 6 posts in a given category? */}
        {/* <h2 className={styles.subTitle}>Categories</h2>
        <div className={styles.blogList}>
          {
            categories.map((category, i) => category.fieldValue &&(
              <div key={i}>
                <h3>{category.fieldValue}</h3>
                <PostGrid posts={category.edges.map(edge => edge.node)}/>
              </div>
            ))
          }
        </div> */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPosts: allMarkdownRemark (
      filter: {
        fileAbsolutePath: {
          regex: "/src/pages/blog//"
        }
        frontmatter:{
          published: {eq : true}
          type: {ne: "page"}
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ){
      totalCount
      edges {
        node {
          id
          fields{
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            desc
            categories
          }
          excerpt
        }
      }
    }
  
  js30: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog/series/js30//"
      }
      frontmatter:{
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___part, frontmatter___date], order: DESC }
    limit: 6
  ){
    edges{
      node{
        id
        fields{
          slug
        }
        frontmatter {
          title
          desc
          date(formatString: "DD MMMM, YYYY")
          categories
        }
      }
    }
  }

  twoBit: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog/series/2bithistory//"
      }
      frontmatter:{
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 6
  ){
    edges{
      node{
        id
        fields{
          slug
        }
        frontmatter {
          title
          desc
          date(formatString: "DD MMMM, YYYY")
          categories
        }
      }
    }
  }

  wpBook: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog/series/wpbook//"
      }
      frontmatter:{
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
    limit: 6
  ){
    edges{
      node{
        id
        fields{
          slug
        }
        frontmatter {
          title
          desc
          date(formatString: "DD MMMM, YYYY")
          categories
        }
      }
    }
  }
  
  allCategories: allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/src/pages/blog//"
      }
      frontmatter:{
        published: {eq : true}
        type: {ne: "page"}
      }
    }
    sort: { fields: [frontmatter___date], order: DESC }
  ){
    group(
      field:frontmatter___categories
      limit: 2
    ){
        totalCount
        fieldValue
        edges{
          node{
            id
            fields{
              slug
            }
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              desc
              categories
            }
          }
        }
     }
   }
  }
`