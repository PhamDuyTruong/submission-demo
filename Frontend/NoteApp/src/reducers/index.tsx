import { combineReducers } from "redux";
import {registerReducer, loginReducer} from '../reducers/AuthReducer'

const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
});


export default rootReducer;