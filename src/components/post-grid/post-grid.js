import React from 'react'
import styles from './post-grid.module.css'
import PostCard from "../post-card/post-card"

// postNodes originates thru a graphQL query
// postNodes = data.allPosts.edges.map( edge => edge.node )
const PostGrid = ({posts}) => (
  <div className={styles.postGrid}>
    {
      posts.map( (node, i) => (
        <PostCard key={i} post={node} className={styles.postGridItem}/>
      ))
    }
  </div>
)

export default PostGrid

