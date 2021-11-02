import axios from "axios";
export const Url = "http://localhost:3000"
const server = axios.create({
    baseURL: Url,
})

