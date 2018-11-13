import React from 'react'
import styles from './post-list.module.css'
import PostCard from "../post-card/post-card"

// posts originates thru a graphQL query
// posts = data.allPosts.edges.map( edge => edge.node )
const PostList = ({posts}) => (
  <div className={styles.postList}>
    {
      posts.map( (node, i) => (
        <PostCard key={i} post={node} className={styles.postListItem}/>
      ))
    }
  </div>
)

export default PostList

