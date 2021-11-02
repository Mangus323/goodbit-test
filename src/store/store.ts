import {applyMiddleware} from 'redux';
import {createStore} from 'redux';
import thunkMiddleware from "redux-thunk";
import {reducer} from "./reducer";


export type AppStateType = ReturnType<typeof reducer>

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store;
