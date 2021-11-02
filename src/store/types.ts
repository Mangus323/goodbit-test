export type PostType = {
    id: number,
    title: string,
    body: string,
}
export type CommentType = {
    id: number,
    postId: number,
    text: string,
}
export type RequestDataType = PostType & {
    comments: Array<{ id: number, text: string }>
}
