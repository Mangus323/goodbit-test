import axios from "axios";
import {RequestDataType} from "./types";

const Url = "https://my-json-server.typicode.com/Mangus323/goodbit-test"
export const server = axios.create({
    baseURL: Url,
})

export const requestLoad = async (): Promise<Array<RequestDataType>> => {
    let answer = await server.get("/posts")
    let data: Array<RequestDataType> = answer.data
    return answer.status === 200 ? data : []
}

export const requestLoadPost = async (id: number): Promise<RequestDataType | null> => {
    let answer = await server.get("/posts/" + id)
    let data: RequestDataType = answer.data
    return answer.status === 200 ? data : null
}

