import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import React from 'react'

const postsList = () => {
    const posts = useSelector(selectAllPosts)

    const renderedPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
            </p>
            <p>{post.content.substring(0, 100)}</p>
        </article>
    ))
    return(
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )


}

export default postsList