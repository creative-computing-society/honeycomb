import React, {useEffect} from 'react'
import { getQuestionsByRoom } from '../actions/questions'
import { connect, useDispatch, useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import DoorUI from "../components/Portal/AwesomePortal";
import { Fragment } from 'react';
import Notif from '../components/Toast/MidErrorToast' 
import {back, checkPoint} from '../actions/auth'
import {Spinner} from 'react-bootstrap'

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
       const delay = ( id) => {
           console.log(id);
    //  event.preventDefault();
    
   };

   console.log(match.params.roomId);
   const handleGoBack = () => {
       history.push('/maze/'+lastRoom);
   }
    return (
        <Fragment>

        {match.params.roomId !== '0' && match.params.roomId !== '1' ?
        <Fragment>
        <div className='room'>

            {questions && questions.loading? <Spinner animation="border" variant="danger" className='question-spinner'/> :
            <Fragment>

            {questions && questions.map((ques) => {
                console.log(ques.qID);
                return (
                    <div className="port">
                    <Link to = {'/path/'+ques.qID} onClick={(e)=>{e.preventDefault();delay(ques.qID);}}>
                        <DoorUI/></Link>
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

        {match.params.roomId === '1' ? 
        <Fragment>
        <div className="body">
        {/* <img src={logo} alt="" className="bgimg" /> */}
        {/* <div className="portthree row1 three">
            
              <DoorUI className="door"></DoorUI>
            
        </div>
        <div className="portthree row1 q2">
         
        <Link to = {{
              pathname:'/path/1A1'
            }}>
              <DoorUI className="door"></DoorUI>
            </Link>
          
        </div>
        <div className="portthree row1 three">
             
              <DoorUI className="door"></DoorUI>
            
        </div>
        <div className="portthree row2 q4">
               
        <Link to = {{
              pathname:'/path/1A2'
            }}>
              <DoorUI className="door"></DoorUI>
            </Link>
    
        </div>
        <div className="portthree row2 q5">
  
        <Link to = {{
              pathname:'/path/1A3'
            }}>
              <DoorUI className="door"></DoorUI>
            </Link>
        </div>
        <center>
              <button onClick={handleGoBack} className='room-back-three solid btn'>Go Back</button>
              </center> */}
              {questions && questions.map((ques) => {
                console.log(ques.qID);
                return (
                    <div className="portthree">
                    <Link to = {'/path/'+ques.qID} onClick={(e)=>{e.preventDefault();delay(ques.qID);}}>
                        <DoorUI/></Link>
                    </div>

                )
            })}
            <center>
            <button onClick={handleGoBack} className='room-back solid btn'>Go Back</button>
            </center>
      </div>
      </Fragment>
        :''}

        {match.params.roomId === '0' ?
        <Fragment>
            <div className="body">
      {/* <center>Hello</center>
      <center>
        <div className="singledoor">
          <Link to = {{
            pathname:'/'
          }}>
            <DoorUI className="door"></DoorUI>
          </Link>
        </div>
      </center> */}
      {questions && questions.map((ques) => {
                console.log(ques.qID);
                return (
                    <div className="singledoor">
                    <Link to = {'/path/'+ques.qID} onClick={(e)=>{e.preventDefault();delay(ques.qID);}}>
                        <DoorUI/></Link>
                    </div>

                )
            })}
            <center>
            <button onClick={handleGoBack} className='room-back solid btn'>Go Back</button>
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
