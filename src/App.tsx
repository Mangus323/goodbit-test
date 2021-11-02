import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PostsList from "./components/PostList/PostsList";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "./store/store";
import {deleteComment, deletePost, editComment, editPost, loadPosts, newComment, newPost} from "./store/reducer";
import {PostType} from "./store/types";

const mapStateToProps = (state: AppStateType) => ({
        ...state
    }
);

const mapDispatchToProps = (dispatch: any) => {
    return {
        load: () => {
            dispatch(loadPosts());
        },
        newPost: (title: string, body: string) => {
            dispatch(newPost(title, body))
        },
        deletePost: (id: number) => {
            dispatch(deletePost(id))
        },
        editPost: (post: PostType) => {
            dispatch(editPost(post))
        },

        newComment: (postId: number, text: string) => {
            dispatch(newComment(postId, text))
        },
        deleteComment: (postId: number, id: number) => {
            dispatch(deleteComment(postId, id))
        },
        editComment: (postId: number, id: number, text: string) => {
            dispatch(editComment(postId, id, text))
        },
    };
}

function App(props: AppProps) {
    if (props.loaded === null) {
        props.load();
        return <p>Загрузка</p>
    }

    return (
        <div>
            <Route exact path="/posts/" render={() => (
                <PostsList {...props}/>
            )}/>

            <Route path="/posts/:id?" render={() => (
                <></>
            )}/>

            <Route exact path="/" render={() =>
                <Redirect to={"/posts/"}/>
            }/>
        </div>
    );
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export type AppProps = ConnectedProps<typeof connector>;

export default connector(App);

