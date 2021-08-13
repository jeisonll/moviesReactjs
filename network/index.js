import Axios from "axios"

const http = Axios.create({
    baseURL: 'https://api-movies-free.herokuapp.com/api/v2',
    headers: {
        "content-type": "application/json"
    }
})
http.interceptors.response.use((res => {
    return res.data;
}))

export const get = (url) => http.get(url);
export const post = (url, params) => http.post(url, params);
export const put = (url, params) => http.put(url, params);
export const deleteRequest = (url, params) => (http.delete(url, params));

