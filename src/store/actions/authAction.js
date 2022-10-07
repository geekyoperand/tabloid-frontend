import dummyService from "service/dummyService"
import * as actions from "../actionTypes/authActionTypes"

export const getDummyData = (limit = 1) => {
    return async function (dispatch) {
        try {
            const response = await dummyService.getData(limit)
            if (response)
                dispatch({
                    type: actions.GET_DATA,
                    payload: response,
                })
            else console.log("ERROR READING JSON", response)
        } catch (err) {
            console.log("ERROR WITH FETCH REQ")
            console.log(err)
        }
    }
}
