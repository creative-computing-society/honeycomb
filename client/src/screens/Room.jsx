import React, {useEffect} from 'react'
import { getQuestionsByRoom } from '../actions/questions'
import { connect,  useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import DoorUI from "../components/Portal/AwesomePortal";
import { Fragment } from 'react';
import Notif from '../components/Toast/MidErrorToast' 
import {back, checkPoint} from '../actions/auth'
import {Spinner} from 'react-bootstrap'
import '../App.css'
const Room = ({auth, getQuestionsByRoom, checkPoint,back, match}) => {
     const history = useHistory();
    useEffect(() => {
        getQuestionsByRoom(auth.key, match.params.roomId);
        checkPoint(match.params.roomId);
        back(auth.key, match.params.roomId);
    }, [getQuestionsByRoom, auth.key, match.params.roomId, back, checkPoint]);
    const lastRoom = (auth.back && auth.back.room) || 0;
    const questions = useSelector(state => state.questions.questionsByLevel);
    const questionsError = useSelector(state => state.questions);


   const handleGoBack = () => {
       history.push('/maze/'+lastRoom);
   }
    return (
        <Fragment>

        {match.params.roomId !== '0' && match.params.roomId !== '1' && match.params.roomId !== '8'  && match.params.roomId !== '7B' ?
        <Fragment>
        <div className='room'>

            {questions && questions.loading? <Spinner animation="border" variant="danger" className='question-spinner'/> :
            <Fragment>

            {questions && questions.map((ques) => {
                return (
                    <div className={"port " + (ques.is_solved ? 'isSolved' : '')}>
                    {/* <Link to = {'/path/'+ques.qID} > */}
                        <DoorUI id={ques.qID}/>
                        {/* </Link> */}
                    </div>

                )
            })}
            <center>
            <button onClick={handleGoBack} className='room-back solid btn'>Go Back</button>
            </center>
            </Fragment>
        }
        </div>
        </Fragment>
        : " " }

        {match.params.roomId === '1' || match.params.roomId === '7B' ? 
        <Fragment>
        <div className="room">
                <Fragment>
                
              {questions && questions.map((ques) => {
                return (
                    <div className={"three-doors " + (ques.is_solved ? 'isSolved' : '')}>
                    {/* <Link to = {'/path/'+ques.qID} > */}
                    <DoorUI id={ques.qID}/>
                        {/* </Link> */}
                    </div>

                )
            })}
            <center>
            <button onClick={handleGoBack} className='room-back solid btn'>Go Back</button>
            </center>
            </Fragment>
      </div>
      </Fragment>
        :''}

        {match.params.roomId === '0' ?
        <Fragment>
            <div className="room">

      {questions && questions.map((ques) => {
                return (

                    <div className={"one-door " + (ques.is_solved ? 'isSolved' : '')} >    
                      {/* <Link  to = {'/path/'+ques.qID}> */}
                        <DoorUI id={ques.qID} className="one-door-main" />
                        {/* </Link> */}
                    </div>

                )
            })}

            

    </div>
        </Fragment>
       :"" }

{match.params.roomId === '8' ?
        <Fragment>
            <div className="room">

      {questions && questions.map((ques) => {
                return (

                    <div className={"one-door " + (ques.is_solved ? 'isSolved' : '')}>    
                      {/* <Link  to = {'/path/'+ques.qID}> */}
                        <DoorUI id={ques.qID} className='one-door-main '/>
                        {/* </Link> */}
                    </div>

                )
            })}

<center>
            <button onClick={handleGoBack} className=' solid btn special-btn'>Go Back</button>
            </center>

    </div>
        </Fragment>
       :"" }
        {questionsError && questionsError.questionsByLevel && questionsError.questionsByLevel.length < 1 ?
          <Notif text="You are not allowed to access this room" color='danger'/> : ''
        }
        </Fragment>
    )
}

Room.propTypes = {
    // auth: PropTypes.object.isRequired,
    getQuestionsByRoom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});




export default connect(mapStateToProps, {getQuestionsByRoom, checkPoint, back})(Room)
