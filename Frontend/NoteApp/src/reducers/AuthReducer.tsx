import {REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from '../constant/AuthConstant'

const registerState = {
    registerUser: [],
    isLoading: false,
    error: null
}

const loginState ={
    loginUser: [],
    isLoading: false,
    error: null
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerReducer(state = registerState, action: any){
    switch(action.type){
        case REGISTER_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case REGISTER_SUCCESS: {
            return {...state, isLoading: false, registerUser: action.payload}
        }
        case REGISTER_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default:
            return state
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loginReducer(state = loginState, action:any){
    switch(action.type){
        case LOGIN_REQUEST: {
            return {...state, isLoading: true, error: null}
        }
        case LOGIN_SUCCESS: {
            return {...state, isLoading: false, loginUser: action.payload}
        }
        case LOGIN_FAILURE: {
            return {...state, isLoading: false, error: action.payload}
        }
        default:
            return state
    }
}
