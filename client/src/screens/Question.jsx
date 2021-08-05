import React from 'react'
import { useEffect, useState } from 'react'
import { getQuestionsById, postAnswer } from '../actions/questions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import Typewriter from 'typewriter-effect';
import image1 from '../images/image_1.jpg'
import image2 from '../images/image_2.jpg'
import image3 from '../images/image_3.jpg'
import image4 from '../images/imag4.jpeg'
import image5 from '../images/image5.jpeg'
import image6 from '../images/image6.jpg'
import image7 from '../images/image7.jpg'
import image8 from '../images/image8.jpg'
import {Alert} from 'react-bootstrap'



const Question = ({match}) => {
    const questions = useSelector(state => state.questions);
    const question = useSelector(state => state.questions.questionById);

    const questionText = (question && question.q_text) || 'Please Wait'

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(getQuestionsById(auth.key, match.params.qID));
    },[getQuestionsById, auth.key, match.params.qID]);
    
    var imageNumber = Math.floor(Math.random() * 8);
    var image = [image1, image2, image3,image4,image5,image6,image7,image8 ];
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
<Alert variant="danger" onClose={() => setShow(false)} dismissable>
            <Alert.Heading>Incorrect Answer</Alert.Heading>
        </Alert>:
            <div className='answer-submission'>
            <input type='text' placeholder='answer' value={answer} onChange={e => setAnswer(e.target.value)} /><br/>
            <button className='hint'>Hint</button>
            <button onClick={answerHandler}>Submit</button></div>

            </div>
            {/* {questions.answer === 'incorrect'? */}
            
        
            
        </div>
    )
}

export default Question
