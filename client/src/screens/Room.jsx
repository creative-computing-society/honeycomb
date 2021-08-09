import React, {useEffect} from 'react'
import { getQuestionsByRoom } from '../actions/questions'
import { connect, useDispatch, useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import background from '../images/backgroundimage.png'
import DoorUI from "../components/Portal/portal";
const Room = ({auth, getQuestionsByRoom, match}) => {
     const history = useHistory();
    useEffect(() => {
        getQuestionsByRoom(auth.key, match.params.roomId);
    }, [getQuestionsByRoom, auth.key, match.params.roomId]);
    const questions = useSelector(state => state.questions.questionsByLevel);
    
       const delay = ( id) => {
           console.log(id);
    //  event.preventDefault();
    setTimeout(() => history.push("/path/" + id), 2400);
   };
    return (
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
        </div>
    )
}

Room.propTypes = {
    // auth: PropTypes.object.isRequired,
    getQuestionsByRoom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});




export default connect(mapStateToProps, {getQuestionsByRoom})(Room)
