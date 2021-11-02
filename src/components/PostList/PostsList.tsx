import React from "react";
import {CommentType} from "../../store/types";
import Post from "../Post/Post";
import {AppProps} from "../../App";
import s from "./PostList.module.css"
import NewPost from "../Post/NewPost";


const PostsList = (props: AppProps) => {
    let postsList = props.posts.map((item) => (
        <Post {...props} {...item} key={item.id} comments={findComments(props.comments, item.id)}/>))

    return (
        <div className={s.list}>
            <NewPost onSend={props.newPost} />
            {postsList}
        </div>
    )

};

const findComments = (comments: Array<CommentType>, id: number): Array<CommentType> => {
    let array: Array<CommentType> = []
    comments.forEach(comment => {
        if (comment.postId === id) array.push(comment)
    })
    return array
}


export default PostsList;
