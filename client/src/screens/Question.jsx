import React from 'react'
import { useEffect, useState } from 'react'
import { getQuestionsById, postAnswer } from '../actions/questions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
const Question = ({match}) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionsById(auth.key, match.params.qID));
    },[getQuestionsById,auth.key, match.params.qID]);
    
    const questions = useSelector(state => state.questions);
    const question = useSelector(state => state.questions.questionById);

    const [answer, setAnswer] = useState('');
    const history = useHistory();
    const answerHandler = (e) => {
        e.preventDefault();
        dispatch(postAnswer(auth.key, match.params.qID, answer));
    }

    if(questions.answer && questions.answer.message === 'correct'){
        history.push('/maze/'+questions.answer.leads_to);
    }
    return (
        <div>
            <h1>Ques:</h1><h3>{question && question.q_text}</h3>
            <input type='text' placeholder='answer' value={answer} onChange={e => setAnswer(e.target.value)}/>
            <button onClick={answerHandler}>Submit</button>

        </div>
    )
}

export default Question
