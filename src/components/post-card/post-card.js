import React from 'react'
import styles from './post-card.module.css'
import { Link } from 'gatsby'


const PostCard = ({post, className}) => {
  return (
  <div className={`${className} ${styles.blogItem}`} key={post.id}>
    <h2 className={styles.blogPostTitle}> <Link to={post.fields.slug}>{post.frontmatter.title}</Link> </h2> 
    <span className={styles.blogPostDate}> {post.frontmatter.date}</span>
    <p className={styles.blogDesc}> {post.frontmatter.desc || post.excerpt} </p>
    <ul className={styles.blogCategories}>
      { post.frontmatter.categories && 
          post.frontmatter.categories.map((category,i) => (
            <li key={i} className={styles.blogCategory}>
              <Link to={`/blog/categories/${category}`}>{category}</Link>
            </li>
          ))
      }
    </ul>
  </div>
  )
}

export default PostCard

