import { applyMiddleware, compose, createStore } from "redux"
import { routerMiddleware } from "connected-react-router"
import thunk from "redux-thunk"
import createRootReducer from "./reducers"

const createBrowserHistory = require("history").createBrowserHistory
const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)

const middlewares = [thunk, routeMiddleware]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                ...middlewares
            )
        )
    )

    return store
}
