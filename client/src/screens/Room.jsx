import React, {useEffect} from 'react'
import { getQuestionsByRoom } from '../actions/questions'
import { connect, useDispatch, useSelector } from 'react-redux'
const Room = ({auth, getQuestionsByRoom, match}) => {
    useEffect(() => {
        getQuestionsByRoom(auth.key, match.params.roomId);
    }, [match.params.roomId]);

    return (
        <div>
            
        </div>
    )
}

Room.propTypes = {
    match: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    getQuestionsByRoom: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {getQuestionsByRoom})(Room)
