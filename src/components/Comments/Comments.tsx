import React from "react";
import Comment from "./Comment"
import {PostPropsType} from "../Post/Post";
import s from "./Comments.module.css"
import NewComment from "./NewComment";

const Comments = (props: PostPropsType) => {
    let commentsList = props.comments?.map((item, index) => (
        <Comment delete={props.deleteComment}
                 edit={props.editComment} {...item} key={index}/>
    ))

    return (
        <div className={s.comments}>
            {commentsList}
            <NewComment onSend={props.newComment} postId={props.id}/>
        </div>
    )
};

export default Comments;



