import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link } from "react-router-dom";
const FiveDoors = () => {
  return (
    <div className="body">
      <img src={logo} alt="" className="bgimg" />
      <div className="port row1 q1">
        <Link to="/">
          <DoorUI className="door"></DoorUI>
        </Link>
      </div>
      <div className="port row1 q2">
        <Link to="/">
          <DoorUI className="door"></DoorUI>
        </Link>
      </div>
      <div className="port row1 q3">
        <Link to="/">
          <DoorUI className="door"></DoorUI>
        </Link>
      </div>
      <div className="port row2 q4">
        <Link to="/">
          <DoorUI className="door"></DoorUI>
        </Link>
      </div>
      <div className="port row2 q5">
        <Link to="/">
          <DoorUI className="door"></DoorUI>
        </Link>
      </div>
    </div>
  );
};

export default FiveDoors;
