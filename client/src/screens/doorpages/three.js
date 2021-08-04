import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link, useHistory } from "react-router-dom";
const ThreeDoors = () => {
  const history = useHistory();
  const delay = (e) => {
       e.preventDefault();
       setTimeout(()=>history.push('/'), 2450);
   };
  return (
    <div className="body">
      <img src={logo} alt="" className="bgimg" />
      <div className="port row1 three">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
      <div className="port row1 q2">
              <Link to = {{
            pathname:'/'
          }} onClick={delay}>
            <DoorUI className="door"></DoorUI>
          </Link>
      </div>
      <div className="port row1 three">
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

export default ThreeDoors;
