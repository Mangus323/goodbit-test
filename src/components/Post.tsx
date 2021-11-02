import React from "react";
import {CommentType, PostType} from "../store/types";
import Comments from "./Comments";


const Post = (props: PostType & {comments?: Array<CommentType>}) => {
    //console.log(props.comments)
    return (
        <>
            <p>{props.title}</p>
            <p>{props.body}</p>
            <Comments comments={props.comments}/>
        </>
    )
};

export default Post;
