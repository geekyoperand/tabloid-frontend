import { combineReducers } from "redux"
import dummyReducer from "./dummyReducer"
import { connectRouter } from "connected-react-router"

const reducer = (history) =>
    combineReducers({
        data: dummyReducer,
        router: connectRouter(history),
    })

export default reducer
