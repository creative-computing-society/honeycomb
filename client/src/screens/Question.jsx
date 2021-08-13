import React from 'react'
import { useEffect, useState } from 'react'
import { getQuestionsById, postAnswer } from '../actions/questions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Typewriter from 'typewriter-effect';
import image1 from '../images/image_1.jpg'
import image2 from '../images/image_2.jpg'
import image3 from '../images/image_3.jpg'
import image4 from '../images/imag4.jpeg'
import image5 from '../images/image5.jpeg'
import image6 from '../images/image6.jpg'
import image7 from '../images/image7.jpg'
import image8 from '../images/image8.jpg'
import Notif from '../components/Toast/NewToast'
import { getHints } from '../actions/questions'
import {Badge, Modal, Spinner} from 'react-bootstrap'
import { Fragment } from 'react'
// import {Spinner} from 'react-bootstrap'
import LockIcon from '@material-ui/icons/Lock';
import Skeleton from '@material-ui/lab/Skeleton';

const Question = ({match}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [imageNumber, setImageNumber] = useState(0);
    const questions = useSelector(state => state.questions);
    const question = useSelector(state => state.questions.questionById);

    const questionText = (question && question.q_text) || 'Please Wait'
    const url = (question && question.q_image) || ''

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const hint = useSelector(state => state.questions.hint);
    const hintPoints = (question && question.hint_points) || 0;
    var random;
    
    useEffect(() => {
        dispatch(getQuestionsById(auth.key, match.params.qID));
        random = Math.floor(Math.random() * 8);
        setImageNumber(random);

    },[getQuestionsById, auth.key, match.params.qID, random]);
    var image = [image1, image2, image3,image4,image5,image6,image7,image8 ];
    console.log(imageNumber);

    const [answer, setAnswer] = useState('');
    const history = useHistory();
    const answerHandler = (e) => {
        e.preventDefault();
        dispatch(postAnswer(auth.key, match.params.qID, answer));
    }
    const clickHandler = (e) => {
        hintHandler(e);
        handleShow();
    }
    const hintHandler = (e) => {
        e.preventDefault();
        dispatch(getHints(auth.key, match.params.qID));
    }
    const takeBack = () =>{
      history.push(`/maze/${auth.checkpoint}`);
  }

    if(questions.answer && questions.answer.message === 'correct'){
        history.push('/maze/'+questions.answer.leads_to);
    } else if(questions.answer && questions.answer.error && questions.answer.leads_to){
        history.push('/maze/'+questions.answer.leads_to);
    }
    return (
      <Fragment>
        { questions && questions.loading ?
        <div className='skeleton-loader'>
          <center>
          <Skeleton  variant="text" width={950}/>
          <Skeleton  variant="rect" width={950} height={218} className='x-skeleton'/>
          </center>
        </div> :
        <div className='question-page' style={{backgroundImage: `url(${image[imageNumber]})`}}>
        
                <Fragment>


            <div className='question-div'>
            <h4>
              <p className = "question-text">
            {/* <Typewriter
  options={{
    speed: 1, 
    strings: [questionText],
    autoStart: true,
    loop: true,
    pauseFor: 10000000
  }}
/> */}
{questionText}
</p>
</h4>
{ (question && question.q_image) ? <h4><p><a target="_blank" rel="noopener noreferrer" href={url}><Badge bg="secondary">Click Me!</Badge></a></p></h4> : ''}



            <div className='answer-submission'>
            <input type='text' placeholder='answer' value={answer} onChange={e => setAnswer(e.target.value)} /><br/>
            
            {questions.answerLoading ? <Spinner animation="border" variant="danger" className='answer-spinner'/>
            : <Fragment>{hint?
            <button onClick={handleShow} className='hint'>Hint</button> 
            :
            <button onClick={clickHandler} className='hint'>
              <LockIcon/>
              Hint:{hintPoints}</button>
            }
            
            <button onClick={answerHandler}>Submit</button>
            <button onClick={takeBack} className="goback-btn hint">Go Back</button>
            </Fragment>
            }
            </div>
            
            
            </div>
            {questions.answer === 'incorrect'?
            <Notif text="Your answer was incorrect" color='danger'/>:''}
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hint</Modal.Title>
        </Modal.Header>
        <Modal.Body>{hint? hint.hint : 'Not enough points for hint'}</Modal.Body>
      </Modal>
        
        {question && question.error &&
          <Notif text={question.error} color='danger'/>
        }
        </Fragment>

      
        </div>
}
      </Fragment>
    )
}

export default Question
