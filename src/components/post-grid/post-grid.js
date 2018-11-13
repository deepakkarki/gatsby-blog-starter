import React from 'react'
import styles from './post-grid.module.css'
import { Link } from 'gatsby'

// postNodes originates thru a graphQL query
// postNodes = data.allPosts.edges.map( edge => edge.node )
const PostGrid = ({posts}) => (
  <div className={styles.blogList}>
    {
    posts.map( (node) => (
      <div className={styles.blogItem} key={node.id}>
        <h2 className={styles.blogPostTitle}> <Link to={node.fields.slug}>{node.frontmatter.title}</Link> </h2> 
        <span className={styles.blogPostDate}> {node.frontmatter.date}</span>
        <p className={styles.blogDesc}> {node.frontmatter.desc || node.excerpt} </p>
        <ul className={styles.blogCategories}>
          { node.frontmatter.categories && 
              node.frontmatter.categories.map((category,i) => (
                <li key={i} className={styles.blogCategory}>
                  <Link to={`/blog/categories/${category}`}>{category}</Link>
                </li>
              ))
          }
          {/* <li className={styles.blogCategory}><Link to={`/blog/categories/js`}>javascript</Link></li>
          <li className={styles.blogCategory}><Link to={`/blog/categories/js`}>frontend</Link></li>
          <li className={styles.blogCategory}><Link to={`/blog/categories/js`}>design</Link></li> */}
        </ul>
      </div>
    ))
    }
  </div>
)

export default PostGrid

