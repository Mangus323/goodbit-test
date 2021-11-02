import React, {ChangeEvent, useState} from "react";

type newCommentProps = {
    onSend: (postId: number, text: string) => void,
    postId: number
}

const NewComment = (props: newCommentProps) => {
    const [value, setValue] = useState("");
    const [disabled, disable] = useState(true);

    const onSend = () => {
        setValue("")
        props.onSend(props.postId, value)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => { // проверка на пустую строку
        if (e.target.value === "")
            disable(true)
        else
            disable(false)
        setValue(e.target.value)

    }

    return (
        <div>
            <input type="text" placeholder={"Новый комментарий"} value={value} onChange={onChange}/>
            <button disabled={disabled} onClick={onSend}>Отправить</button>
        </div>
    );
}

export default NewComment
