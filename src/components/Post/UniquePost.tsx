import React from "react";
import {CommentType} from "../../store/types";
import Post from "../Post/Post";
import {AppProps} from "../../App";
import s from "../PostList/PostList.module.css"
import {useParams} from "react-router-dom";


const UniquePost = (props: AppProps) => {
    let {id}: { id: string } = useParams();
    let item = props.posts.find((item) => +id === item.id)

    return item ? (
        <div className={s.list}>
            <Post {...props} {...item} comments={findComments(props.comments, +id)}/>
        </div>
    ) : <p>404</p>

};

const findComments = (comments: Array<CommentType>, id: number): Array<CommentType> => {
    let array: Array<CommentType> = []
    comments.forEach(comment => {
        if (comment.postId === id) array.push(comment)
    })
    return array
}


export default UniquePost;
