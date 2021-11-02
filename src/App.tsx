import React from 'react';
import './App.css';
import {Redirect, Route} from 'react-router-dom';
import PostsList from "./components/PostsList";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "./store/store";
import {loadPosts} from "./store/reducer";

const mapStateToProps = (state: AppStateType) => ({
        ...state
    }
);

const mapDispatchToProps = (dispatch: any) => {
    return {
        load: () => {
            dispatch(loadPosts());
        }
    };
}

function App(props: AppProps) {
    if (props.loaded === null) {
        props.load();
        return <p>Загрузка</p>
    }

    return (
        <div className="App">
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
type AppProps = ConnectedProps<typeof connector>;

export default connector(App);

