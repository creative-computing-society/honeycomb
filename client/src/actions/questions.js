import axios from 'axios'
import {proxy} from './types'
import {QUESTIONS_BY_LEVEL_REQUEST, GET_QUESTIONS_BY_LEVEL, GET_QUESTIONS_BY_LEVEL_FAILURE, QUESTIONS_BY_ID_REQUEST, GET_QUESTIONS_BY_ID, GET_QUESTIONS_BY_ID_FAILURE, 
POST_ANSWER_FAILURE, POST_ANSWER_REQUEST, POST_ANSWER_SUCCESS} from './types'  

// Questions by room
export const getQuestionsByRoom = (token, roomId) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    }
    const body = {
        "room": roomId
    }
    try {
        dispatch({type: QUESTIONS_BY_LEVEL_REQUEST})
        const res = await axios.get(proxy + '/api/question', body, config)
        dispatch({
            type: GET_QUESTIONS_BY_LEVEL,
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: GET_QUESTIONS_BY_LEVEL_FAILURE,
        })
    }
}

// Questions by ID
export const getQuestionsById = (token, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    }
    try {
        dispatch({type: QUESTIONS_BY_ID_REQUEST})
        const res = await axios.get(proxy + '/api/question/'+id, config)
        dispatch({
            type: GET_QUESTIONS_BY_ID,
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: GET_QUESTIONS_BY_ID_FAILURE,
        })
    }
}

// Post Answer
export const postAnswer = (token, questionId, answer) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    }

    const finalAnswer = answer.toLowerCase();
    
    const body = {
        "question": `${questionId}`,
        "ans_submitted": `${finalAnswer}`
    }

    try {
        dispatch({type: POST_ANSWER_REQUEST})

        const res = await axios.post(proxy + '/api/submission', body, config);
        
        dispatch({
            type: POST_ANSWER_SUCCESS,
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: POST_ANSWER_FAILURE,
        })
    }
}
