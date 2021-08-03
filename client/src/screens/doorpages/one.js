import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link } from "react-router-dom";
const OneDoor = () => {
  return (
    <div className="body">
      <img src={logo} alt="" className="bgimg" />
      <center>
        <div className="singledoor">
          <Link to="/">
            <DoorUI className="door"></DoorUI>
          </Link>
        </div>
      </center>
    </div>
  );
};

export default OneDoor;
