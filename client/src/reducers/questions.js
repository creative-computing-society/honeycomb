import {QUESTIONS_BY_LEVEL_REQUEST, GET_QUESTIONS_BY_LEVEL, GET_QUESTIONS_BY_LEVEL_FAILURE, QUESTIONS_BY_ID_REQUEST, GET_QUESTIONS_BY_ID, GET_QUESTIONS_BY_ID_FAILURE, 
    POST_ANSWER_FAILURE, POST_ANSWER_REQUEST, POST_ANSWER_SUCCESS, GET_HINTS_REQUEST, GET_HINTS_SUCCESS, GET_HINTS_FAILURE} from '../actions/types'
    
const initialState = {
    loading: false,
    questionsByLevel: [],
    isSolved: false,
    answerLoading: false
}

function questions(state=initialState, action){
    const {type, payload} = action;

    switch (type) {
        case QUESTIONS_BY_LEVEL_REQUEST:
        case QUESTIONS_BY_ID_REQUEST:
            return {
                loading: true,
            }
        case POST_ANSWER_REQUEST:
            return {
                ...state,
                answer: null,
                answerLoading: true
            }
        case GET_HINTS_REQUEST:
            return {
                ...state,
                hintLoading: true
            }
        case GET_HINTS_SUCCESS:
            return {
                ...state,
                hint: payload,
                hintLoading: true

            }
        case GET_HINTS_FAILURE:
            return {
                ...state,
                hint: null,
                hintLoading: false
            }
        case GET_QUESTIONS_BY_LEVEL:
            return{
                ...state,   
                questionsByLevel: payload,
                loading: false,
            }
        case GET_QUESTIONS_BY_ID:
            return{
                ...state,
                questionById: payload,
                loading: false
            }
        case POST_ANSWER_SUCCESS:
            return{
                ...state,
                answer: payload,
                answerLoading: false
            }
        case POST_ANSWER_FAILURE:
            return{
                ...state,
                answer: payload,
                answerLoading: false
            }
        case GET_QUESTIONS_BY_LEVEL_FAILURE:
        case GET_QUESTIONS_BY_ID_FAILURE:
            return{
                loading: false
            }
        default: 
            return state;
        }

    }

export default questions