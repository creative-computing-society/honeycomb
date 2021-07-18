import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS, 
    REGISTER_FAILURE,
    LOAD_REQUEST,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
}   

function auth(state = initialState, action){
    const { type, payload } = action;
    
    switch(type){
        case LOAD_REQUEST:
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return{
                loading: true
            }
        case USER_LOADED: 
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILURE:
        case AUTH_ERROR:
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state, 
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}

export default auth;