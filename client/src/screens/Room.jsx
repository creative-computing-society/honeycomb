import React, {useEffect} from 'react'
import { getQuestionsByRoom } from '../actions/questions'
import { connect, useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
const Room = ({auth, getQuestionsByRoom, match}) => {
    useEffect(() => {
        getQuestionsByRoom(auth.key, match.params.roomId);
    }, [getQuestionsByRoom, auth.key, match.params.roomId]);
    const questions = useSelector(state => state.questions.questionsByLevel);
    return (
        <div className='room'>

            {questions && questions.map((ques) => {
                return (
                    <Link to = {'/path/'+ques.qID}><h1>Door</h1></Link>
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
