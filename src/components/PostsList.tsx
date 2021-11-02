import React from "react";
import {CommentType, PostType} from "../store/types";
import Post from "./Post";

type PropsType = {
    posts: Array<PostType>,
    comments: Array<CommentType>
}

const PostsList = (props: PropsType) => {
    let postsList = props.posts.map(item => <Post {...item} />)

    return (
        <div>
            {postsList}
        </div>
    )


};

export default PostsList;
