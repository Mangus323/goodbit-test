import {requestAuth, requestLogin, requestLogout, requestRegister} from "../../API/AuthAPI";
import {CommentType, PostType} from "./types";

const LOAD_DATA = "LOAD_DATA"

const NEW_POST = "NEW_POST"
const DELETE_POST = "DELETE_POST"
const EDIT_POST = "EDIT_POST"

const NEW_COMMENT = "NEW_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const EDIT_COMMENT = "EDIT_COMMENT"

type Actions =
    ActionLoadData
    | ActionNewPost
    | ActionDeletePost
    | ActionEditPost
    | ActionNewComment
    | ActionDeleteComment
    | ActionEditComment


type ActionLoadData = {
    type: typeof LOAD_DATA,
    posts: Array<PostType>,
    comments: Array<CommentType>
}
type ActionNewPost = {
    type: typeof NEW_POST,
    post: PostType
}
type ActionDeletePost = {
    type: typeof DELETE_POST,
    id: number
}
type ActionEditPost = {
    type: typeof EDIT_POST,
    post: PostType,
    id: number
}

type ActionNewComment = {
    type: typeof NEW_COMMENT,
    postId: number
    text: string
}
type ActionDeleteComment = {
    type: typeof DELETE_COMMENT,
    id: number,
    postId: number
}
type ActionEditComment = {
    type: typeof EDIT_COMMENT,
    text: string,
    id: number,
    postId: number
}

type StateType = {
    posts: Array<PostType>,
    comments: Array<CommentType>
    loaded: boolean | null
};

const initialState: StateType = {
    posts: [],
    comments: [],
    loaded: null
};

export const reducer = (state = initialState, action: Actions): StateType => {
    switch (action.type) {
        case LOAD_DATA:
            return {
                posts: action.posts,
                comments: action.comments,
                loaded: true
            }
        case NEW_POST:
            return {
                comments: state.comments,
                posts: [...state.posts, action.post],
                loaded: state.loaded,
            }
        case DELETE_POST:
            return {
                comments: state.comments,
                posts: editPost(state.posts, action.id),
                loaded: state.loaded,
            }
        case EDIT_POST:
            return {
                comments: state.comments,
                posts: editPost(state.posts, action.id, action.post),
                loaded: state.loaded,
            }
        case NEW_COMMENT:
            let lastId = getLastId(state.comments, action.postId)
            return {
                comments: [...state.comments, {id: lastId + 1, postId: action.postId, text: action.text}],
                posts: state.posts,
                loaded: state.loaded
            }
        case DELETE_COMMENT:
            return {
                comments: editComment(state.comments, action.postId, action.id),
                posts: state.posts,
                loaded: state.loaded
            }
        case EDIT_COMMENT:
            return {
                comments: editComment(state.comments, action.postId, action.id, action.text),
                posts: state.posts,
                loaded: state.loaded
            }
        default:
            return state;
    }
};

//Возвращает последний id коммента у поста (должен обрабатываться на сервере)
function getLastId(comments: Array<CommentType>, postId: number): number {
    let max = 0
    comments.forEach((item) => {
        if (item.postId === postId && max < item.id) max = item.id
    })
    return max
}

// Возвращает новый массив, заменяя пост с id на newPost
function editPost(posts: Array<PostType>, id: number, newPost?: PostType): Array<PostType> {
    let newArray = [...posts]
    let index = posts.findIndex(post => post.id === id) // индекс в массиве для нужного id

    newPost ? newArray.splice(index, 1, newPost) : newArray.splice(index, 1)
    return newArray
}

// Возвращает новый массив, заменяя комментарий с id на newComment
function editComment(comments: Array<CommentType>, postId: number, id: number, text?: string): Array<CommentType> {
    let newArray = [...comments]
    let index = comments.findIndex(comment => comment.id === id && comment.postId === postId) // индекс в массиве для нужного id

    if (text) { // замена
        let comment = comments[index]
        let newComment: CommentType = {postId: comment.postId, id: comment.id, text: text}
        newArray.splice(index, 1, newComment)
    } else { // удаление
        newArray.splice(index, 1)
    }
    return newArray
}


const setPosts = (data: { posts: Array<PostType>, comments: Array<CommentType> }): ActionLoadData => {
    return {
        type: LOAD_DATA,
        ...data
    }
};

export const loadPosts = () => (
    async (dispatch: any) => {
        const data = await requestLoad();
        dispatch(setPosts(data));
    }
)


