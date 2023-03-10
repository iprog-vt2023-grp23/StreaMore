import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts, selectNewPosts } from "./postSlice";
import PostsExcerpt from "./PostsExcerpt";
import React, { useEffect } from 'react'

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectNewPosts);
    let postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if(postStatus === 'idle'){
            postStatus = 'pending'
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if(postStatus === 'loading'){
        content = <p>"Loading..."</p>;
    } else if(postStatus === 'succeeded'){
        console.log(posts)
        content = posts.map(post => <PostsExcerpt key={post.id} post={post} />);
    } else if(postStatus === 'failed'){
        content = <p>{error}</p>;
    }

    return(
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )


}

export default PostsList