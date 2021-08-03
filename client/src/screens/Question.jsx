import React from 'react'
import { useEffect, useState } from 'react'
import { getQuestionsById, postAnswer } from '../actions/questions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import Typewriter from 'typewriter-effect';
import image_1 from '../images/image_1.jpg'
import image_2 from '../images/image_2.jpg'
import image_3 from '../images/image_3.jpg'


const Question = ({match}) => {
    const questions = useSelector(state => state.questions);
    const question = useSelector(state => state.questions.questionById);

    const questionText = (question && question.q_text) || 'Please Wait'

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuestionsById(auth.key, match.params.qID));
    },[getQuestionsById, auth.key, match.params.qID]);
    
    var imageNumber = Math.floor(Math.random() * 3);
    var image = [image_1, image_2, image_3];
    console.log(imageNumber);
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
        <div className='question-page' style={{backgroundImage: `url(${image[imageNumber]})`}}>
            <div className='question-div'>
            <h3>
            <Typewriter
  options={{
    strings: [questionText],
    autoStart: true,
    loop: true,
    pauseFor: 10000000
  }}
/></h3>
            <div className='answer-submission'>
            <input type='text' placeholder='answer' value={answer} onChange={e => setAnswer(e.target.value)} />
            <button onClick={answerHandler}>Submit</button></div>
            </div>
        </div>
    )
}

export default Question
