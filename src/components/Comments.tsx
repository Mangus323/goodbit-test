import React from "react";
import {CommentType, PostType} from "../store/types";

type PropsType = {
    comments?: Array<CommentType>
}

const Comments = (props: PropsType) => {
    let commentsList = props.comments?.map((item, index) => <Comment {...item} key={index} />)

    return (
        <div>
            {commentsList}
        </div>
    )
};

export default Comments;

const Comment = (props: CommentType) => {
    return (
        <div>
            <input type="text" placeholder={props.text} />
        </div>
    )
}
