import React from "react";
import {CommentType, PostType} from "../store/types";
import Post from "./Post";

type PropsType = {
    posts: Array<PostType>,
    comments: Array<CommentType>
}

const PostsList = (props: PropsType) => {

    let postsList = props.posts.map((item, index) => (
        <Post {...item} key={index}
              comments={findComments(props.comments, item.id)}/>))

    return (
        <div>
            {postsList}
        </div>
    )

};

const findComments = (comments: Array<CommentType>, id: number): Array<CommentType> => {
    let array: Array<CommentType> = []
    //console.log(comments)
    comments.forEach(comment => {
        if (comment.id === id) array.push(comment)
    })
    return array
}


export default PostsList;
