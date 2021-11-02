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
