import axios from "axios"

const qs = require("qs")

const http = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 120000,
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        })
    },
})

http.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
        console.log("Error: ", expectedError, error)
        return Promise.reject(error)
    }
)

export default http
