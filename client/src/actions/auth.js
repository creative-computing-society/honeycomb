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
    SAVE_TEAM_LEADER_INFO,
    SAVE_TEAM_LEADER_INFO_FAILURE,
    proxy
} from './types';

// Save team leader info
export const saveTeamLeader = (teamName, name1, email1, mobile1) => async dispatch => {
    try {
        const res = {teamName, name1, email1, mobile1}
        dispatch({
            type: SAVE_TEAM_LEADER_INFO,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: SAVE_TEAM_LEADER_INFO_FAILURE
        })
    }
}

// Load User
export const loadUser = (token) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    }
    try {
        dispatch({
            type: LOAD_REQUEST
        })

        const res = await axios.get(proxy+'/api/participant', config);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type:AUTH_ERROR,
            payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
}


// Register User    

export const register = (
    teamName,name1,name2,name3,email1,email2,email3,discord_ID1,discord_ID2,discord_ID3 
) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            // 'Authorization': `${token}`
        }
    }
    var body = {
        "teamName": `${teamName}`,
        "teamLeader": {"name": `${name1}`, "email": `${email1}`, "discord_ID": `${discord_ID1}`},
    }

    if(name2 && email2 && discord_ID2 && name3 && email3 && discord_ID3){
        body = {
        "teamName": `${teamName}`,
        "teamLeader": {"name": `${name1}`, "email": `${email1}`, "discord_ID": `${discord_ID1}`},
        "member1": {"name": `${name2}`, "email": `${email2}`, "discord_ID": `${discord_ID2}`},
        "member2": {"name": `${name3}`, "email": `${email3}`, "discord_ID": `${discord_ID3}`}
        }
    }else if(name2 && email2 && discord_ID2){
        body = {
            "teamName": `${teamName}`,
            "teamLeader": {"name": `${name1}`, "email": `${email1}`, "discord_ID": `${discord_ID1}`},
            "member1": {"name": `${name2}`, "email": `${email2}`, "discord_ID": `${discord_ID2}`},
        };
    }
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

    } catch (error) {
        // const errors = e.response.data.errors;
        dispatch({
            type: REGISTER_FAILURE,
            payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
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

        const res = await axios.post(proxy+'/api/auth/login/', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser(res.data.key));
    } catch (error) {

        dispatch({
            type: LOGIN_FAILURE,
            payload:
        error.response.data.non_field_errors

        })
    }
}

// Logout User
export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT});
}