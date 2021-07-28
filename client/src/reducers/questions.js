import {QUESTIONS_BY_LEVEL_REQUEST, GET_QUESTIONS_BY_LEVEL, GET_QUESTIONS_BY_LEVEL_FAILURE, QUESTIONS_BY_ID_REQUEST, GET_QUESTIONS_BY_ID, GET_QUESTIONS_BY_ID_FAILURE, 
    POST_ANSWER_FAILURE, POST_ANSWER_REQUEST, POST_ANSWER_SUCCESS} from '../actions/types'
    
const initialState = {
    loading: null,
    questionsByLevel: [],
    isSolved: false,
}

function questions(state=initialState, action){
    const {type, payload} = action;

    switch (type) {
        case QUESTIONS_BY_LEVEL_REQUEST:
        case QUESTIONS_BY_ID_REQUEST:
        case POST_ANSWER_REQUEST:
            return {
                loading: true,
            }

        case GET_QUESTIONS_BY_LEVEL:
            return{
                questionsByLevel: payload,
                loading: false,
            }
        case GET_QUESTIONS_BY_ID:
            return{
                ...state,
                questionById: payload
            }
        case POST_ANSWER_SUCCESS:
            return{
                ...state,
                answer: payload
            }

        case GET_QUESTIONS_BY_LEVEL_FAILURE:
        case POST_ANSWER_FAILURE:
        case GET_QUESTIONS_BY_ID_FAILURE:
            return{
                loading: false
            }
        default: 
            return state;
        }

    }

export default questions