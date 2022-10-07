import * as actions from "../actionTypes/authActionTypes"

const initialState = {
    tableData: [],
    tableCount: 0,
}

const dummyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_DATA:
            state = { ...state, tableData: action.payload.tableData, tableCount: action.payload.tableCount }
            break

        default:
            state
    }
    return state
}

export default dummyReducer
