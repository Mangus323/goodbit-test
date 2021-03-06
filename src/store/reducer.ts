import {CommentType, PostType} from "./types";
import {requestLoad} from "./API";

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
    title: string,
    body: string
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
                posts: [...state.posts, {id: getLastPostId(state.posts) + 1, title: action.title, body: action.body}],
                loaded: state.loaded,
            }
        case DELETE_POST:
            return {
                comments: state.comments,
                posts: editPosts(state.posts, action.id),
                loaded: state.loaded,
            }
        case EDIT_POST:
            return {
                comments: state.comments,
                posts: editPosts(state.posts, action.id, action.post),
                loaded: state.loaded,
            }
        case NEW_COMMENT:
            let lastId = getLastCommentId(state.comments, action.postId)
            return {
                comments: [...state.comments, {id: lastId + 1, postId: action.postId, text: action.text}],
                posts: state.posts,
                loaded: state.loaded
            }
        case DELETE_COMMENT:
            return {
                comments: editComments(state.comments, action.postId, action.id),
                posts: state.posts,
                loaded: state.loaded
            }
        case EDIT_COMMENT:
            return {
                comments: editComments(state.comments, action.postId, action.id, action.text),
                posts: state.posts,
                loaded: state.loaded
            }
        default:
            return state;
    }
};

//???????????????????? ?????????????????? id ??????????, ???????? ???? ?????? ???? -1 (???????????? ???????????????????????????? ???? ??????????????)
function getLastPostId(posts: Array<PostType>): number {
    if (posts.length > 0)
        return posts[posts.length - 1].id
    else
        return -1
}

//???????????????????? ?????????????????? id ???????????????? ?? ?????????? (???????????? ???????????????????????????? ???? ??????????????)
function getLastCommentId(comments: Array<CommentType>, postId: number): number {
    let max = 0
    comments.forEach((item) => {
        if (item.postId === postId && max < item.id) max = item.id
    })
    return max
}

// ???????????????????? ?????????? ????????????, ?????????????? ???????? ?? id ???? newPost
function editPosts(posts: Array<PostType>, id: number, newPost?: PostType): Array<PostType> {
    let newArray = [...posts]
    let index = posts.findIndex(post => post.id === id) // ???????????? ?? ?????????????? ?????? ?????????????? id
    newPost ? newArray.splice(index, 1, newPost) : newArray.splice(index, 1)
    return newArray
}

// ???????????????????? ?????????? ????????????, ?????????????? ?????????????????????? ?? id ???? newComment
function editComments(comments: Array<CommentType>, postId: number, id: number, text?: string): Array<CommentType> {
    let newArray = [...comments]
    let index = comments.findIndex(comment => comment.id === id && comment.postId === postId) // ???????????? ?? ?????????????? ?????? ?????????????? id

    if (text) { // ????????????
        let comment = comments[index]
        let newComment: CommentType = {postId: comment.postId, id: comment.id, text: text}
        newArray.splice(index, 1, newComment)
    } else { // ????????????????
        newArray.splice(index, 1)
    }
    return newArray
}


const setPosts = (posts: Array<PostType>, comments: Array<CommentType>): ActionLoadData => {
    return {
        type: LOAD_DATA,
        posts,
        comments
    }
};

export const loadPosts = () => (
    async (dispatch: any) => {
        const data = await requestLoad();
        let posts: Array<PostType> = []
        let comments: Array<CommentType> = []
        data.forEach((item) => {
            posts.push({body: item.body, id: item.id, title: item.title})
            item.comments.forEach((comment) => {
                comments.push({id: comment.id, postId: item.id, text: comment.text})
            })
        })
        dispatch(setPosts(posts, comments));
    }
)

export const newPost = (title: string, body: string): ActionNewPost => {
    return {
        type: NEW_POST,
        title,
        body
    }
}
export const deletePost = (id: number): ActionDeletePost => {
    return {
        type: DELETE_POST,
        id
    }
}
export const editPost = (post: PostType): ActionEditPost => {
    return {
        type: EDIT_POST,
        id: post.id,
        post
    }
}
export const newComment = (postId: number, text: string): ActionNewComment => {
    return {
        type: NEW_COMMENT,
        postId,
        text
    }
}
export const deleteComment = (postId: number, id: number): ActionDeleteComment => {
    return {
        type: DELETE_COMMENT,
        id,
        postId

    }
}
export const editComment = (postId: number, id: number, text: string): ActionEditComment => {
    return {
        type: EDIT_COMMENT,
        id,
        postId,
        text
    }
}

