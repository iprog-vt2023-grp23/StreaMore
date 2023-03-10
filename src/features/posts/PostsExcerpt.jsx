import React from 'react'
import PostAuthor from "./PostAuthor";

const PostsExcerpt = ({post}) => {
  return (
    <article>
        <h3>{post.title}</h3>
        <p className="postCredit">
            <PostAuthor userId={post.userId}/>
        </p>
        <p>{post.body.substring(0, 100)}</p>
    </article>
  )
}

export default PostsExcerpt