import React, {useEffect, useState} from "react";
import {CommentType, PostType} from "../../store/types";
import Comments from "../Comments/Comments";
import s from "./Post.module.css"

export type PostPropsType = PostType & {
    comments?: Array<CommentType>,
    newPost: (title: string, body: string) => void,
    deletePost: (id: number) => void,
    editPost: (post: PostType) => void,
    newComment: (postId: number, text: string) => void,
    deleteComment: (postId: number, id: number) => void,
    editComment: (postId: number, id: number, text: string) => void
}

const Post = (props: PostPropsType) => {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    const [edit, setEdit] = useState(false);

    const onSave = () => {
        setEdit(false)
        props.editPost({body, id: props.id, title})
    }
    const onDelete = () => {
        props.deletePost(props.id)
    }

    useEffect(() => {
        setTitle(props.title);
        setBody(props.body);
    }, [props.title, props.body]);

    return (
        <div className={s.post}>
            <div className={s.textBox}>
                <input className={s.title} disabled={!edit} type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input className={s.body} disabled={!edit} type="text" value={body} onChange={(e) => setBody(e.target.value)}/>
                <div className={s.buttons}>
                    {edit ?
                        <button onClick={onSave}>Сохранить</button> :
                        <button onClick={() => setEdit(true)}>Изменить</button>}
                    <button onClick={onDelete}>Удалить</button>
                </div>

            </div>
            <Comments {...props}/>
        </div>
    )
};

export default Post;
