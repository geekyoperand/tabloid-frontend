import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import configureStore from "store/configureStore"
import Router from "./router"
import "antd/dist/antd.min.css"
import "main.scss"

const history = createBrowserHistory()
const store = configureStore()
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <Provider store={store}>
        <Router history={history} />
    </Provider>
)
