import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {checkPoint} from '../../actions/auth'
const ThreeDoors = ({match}) => {
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const roomId=match.params.roomId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkPoint(roomId));
  }, [dispatch, roomId]);
  const delay1 = (e) => {
       e.preventDefault();
       setTimeout(()=>history.push('/path/1A1'), 2450);
   };
   const delay2 = (e) => {
    e.preventDefault();
    setTimeout(()=>history.push('/path/1A2'), 2450);
};
const delay3 = (e) => {
  e.preventDefault();
  setTimeout(()=>history.push('/path/1A3'), 2450);
};
  return (
    <div className="body">
      {/* <img src={logo} alt="" className="bgimg" /> */}
      <div className="portthree row1 three">
          
            <DoorUI className="door"></DoorUI>
          
      </div>
      <div className="portthree row1 q2">
       
      <Link to = {{
            pathname:'/path/1A1'
          }} onClick={delay1}>
            <DoorUI className="door"></DoorUI>
          </Link>
        
      </div>
      <div className="portthree row1 three">
           
            <DoorUI className="door"></DoorUI>
          
      </div>
      <div className="portthree row2 q4">
             
      <Link to = {{
            pathname:'/path/1A2'
          }} onClick={delay2}>
            <DoorUI className="door"></DoorUI>
          </Link>
  
      </div>
      <div className="portthree row2 q5">

      <Link to = {{
            pathname:'/path/1A3'
          }} onClick={delay3}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
    </div>
  );
};

export default ThreeDoors;
