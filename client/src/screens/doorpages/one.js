import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkPoint} from '../../actions/auth'
const OneDoor = ({match}) => {
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const roomId=match.params.roomId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkPoint(roomId));
  }, [dispatch, roomId]);
 const delay = (e) => {
      e.preventDefault();
      setTimeout(()=>history.push('/path/0'), 1000);
  };
  return (
    <div className="body">
      {/* <img src={logo} alt="" className="bgimg" /> */}
      <center>
        <div className="singledoor">
          <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
        </div>
      </center>
    </div>
  );
};

export default OneDoor;
