import React, {useEffect, useState} from "react";
import s from "./Post.module.css";

type TypeProps = {
    onSend: (title: string, body: string) => void
}

const NewPost = (props: TypeProps) => {
    const [isActive, activate] = useState(false)
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [disabled, disable] = useState(true);

    const onSend = () => {
        setTitle("")
        setBody("")
        activate(false)
        props.onSend(title, body)
    }
    const onCancel = () => {
        setTitle("")
        setBody("")
        activate(false)
    }

    useEffect(() => {
        if (title === "" || body === "")
            disable(true)
        else
            disable(false)
    }, [title, body])

    return isActive ? (
        <div className={s.post}>
            <div className={s.textBox}>
                <input className={s.title} type="text" value={title} placeholder={"Заголовок"}
                       onChange={(e) => setTitle(e.target.value)}/>
                <input className={s.body} type="text" value={body} placeholder={"Текст"}
                       onChange={(e) => setBody(e.target.value)}/>
                <div className={s.buttons}>
                    <button onClick={onCancel}>Отмена</button>
                    <button onClick={onSend} disabled={disabled}>Отправить</button>
                </div>
            </div>
        </div>
    ) : <button className={s.newPostButton} onClick={() => activate(true)}>Написать пост</button>

}

export default NewPost
