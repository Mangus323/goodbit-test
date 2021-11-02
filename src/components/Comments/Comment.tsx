import {CommentType} from "../../store/types";
import React, {useEffect, useState} from "react";
import s from "./Comments.module.css"

type PropsType = CommentType & {
    delete: (postId: number, id: number) => void,
    edit: (postId: number, id: number, text: string) => void
}

const Comment = (props: PropsType) => {
    const [value, setValue] = useState(props.text);
    const [edit, setEdit] = useState(false);

    const onSave = () => {
        setEdit(false)
        props.edit(props.postId, props.id, value)
    }
    const onDelete = () => {
        props.delete(props.postId, props.id)
    }

    useEffect(() => {
        setValue(props.text);
    }, [props.text]);

    return (
        <div className={s.comment}>
            <input disabled={!edit} type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
            <div className={s.buttons}>
                {edit ?
                    <button onClick={onSave}>Сохранить</button> :
                    <button onClick={() => setEdit(true)}>Изменить</button>}
                <button onClick={onDelete}>Удалить</button>
            </div>
        </div>
    );
}

export default Comment
