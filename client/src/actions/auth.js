import axios from 'axios';
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
    proxy
} from './types';



// Load User
export const loadUser = (token) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `${token}`,
        }
    }
    try {
        dispatch({
            type: LOAD_REQUEST
        })

        const res = await axios.get(proxy+'/api/auth', config);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}


// Register User    

export const register = (
    teamName,name1,name2,name3,email1,email2,email3,mobile1,mobile2,mobile3 
) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            // 'Authorization': `${token}`
        }
    }

    const body = {
        "teamName": `${teamName}`,
        "teamLeader": {"name": `${name1}`, "email": `${email1}`, "mobile": `${mobile1}`},
        "member1": {"name": `${name2}`, "email": `${email2}`, "mobile": `${mobile2}`},
        "member2": {"name": `${name3}`, "email": `${email3}`, "mobile": `${mobile3}`}
    };
    console.log(body)

    try {
        dispatch({
            type: REGISTER_REQUEST
        })
        const res = await axios.post(proxy+'/api/register/', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        // dispatch(loadUser(res.data));

    } catch (e) {
        // const errors = e.response.data.errors;
        dispatch({
            type: REGISTER_FAILURE
        })
    }
}

// Login User    

export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-type':'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const res = await axios.post(proxy+'/api/auth', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (e) {
        const errors = e.response.data.errors;

        if(errors){
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAILURE
        })
    }
}

// Logout User
export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT});
}