import userSlice from "../features/userSlice";
import appApi from "../services/appApi";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
})

export default rootReducer