import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link, useHistory } from "react-router-dom";
const FourDoors = () => {
  const history = useHistory();
  const delay = (e) => {
       e.preventDefault();
       setTimeout(()=>history.push('/'), 2400);
   };
  return (
    <div className="body">
      <img src={logo} alt="" className="bgimg" />
      <div className="port row1 q1">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
      <div className="port row1 q2 four">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
      <div className="port row1 q3">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
      <div className="port row2 q4">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
      <div className="port row2 q5">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
    </div>
  );
};

export default FourDoors;
