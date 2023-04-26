/* eslint-disable @typescript-eslint/no-explicit-any */
import {REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from '../constant/AuthConstant'
import authApi from '../services/authApi'
import Swal from 'sweetalert2'

interface UserRegister{
    username: string
    email: string
    phone: string
    password: string
}

export const registerUser  = (value: UserRegister) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return async(dispatch: any) => {
        dispatch({type: REGISTER_REQUEST});
        try {
            const {data} = await authApi.registerUser(value);
            dispatch({type: REGISTER_SUCCESS, payload: data});
            Swal.fire(
                "Sign up successfully!",
                "Return to signin page!"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/login";
                }
              });
        } catch (error) {
            dispatch({type: REGISTER_FAILURE, payload: error})
        }
    }
};

interface loginUser{
    email: string
    password: string
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loginUser = (value: loginUser) => {
    return async(dispatch: any) => {
        dispatch({type: LOGIN_REQUEST});
        try {
            const {data} = await authApi.loginUser(value);
            localStorage.setItem("user", JSON.stringify(data));
            dispatch({type: LOGIN_SUCCESS, payload: data});
            Swal.fire(
                "Sign in successfully !!!",
                "Wish you have a good experience at website",
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/home";
                }
              });
        } catch (error) {
            dispatch({type: LOGIN_FAILURE, payload: error})
        }
    }
};





