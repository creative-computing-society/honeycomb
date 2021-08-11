import React, {useEffect} from 'react'
import { getQuestionsByRoom } from '../actions/questions'
import { connect, useDispatch, useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import DoorUI from "../components/Portal/portal";
import { Fragment } from 'react';
import Notif from '../components/Toast/MidErrorToast' 
import {checkPoint} from '../actions/auth'

const Room = ({auth, getQuestionsByRoom, checkPoint, match}) => {
     const history = useHistory();
    useEffect(() => {
        getQuestionsByRoom(auth.key, match.params.roomId);
        checkPoint(match.params.roomId);
    }, [getQuestionsByRoom, auth.key, match.params.roomId]);
    const questions = useSelector(state => state.questions.questionsByLevel);
    const questionsError = useSelector(state => state.questions);
       const delay = ( id) => {
           console.log(id);
    //  event.preventDefault();
    setTimeout(() => history.push("/path/" + id), 2400);
   };
    return (
        <Fragment>
        <div className='room'>

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
            <button className='room-back solid btn'>Go Back</button>
            </center>

        </div>
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




export default connect(mapStateToProps, {getQuestionsByRoom, checkPoint})(Room)
