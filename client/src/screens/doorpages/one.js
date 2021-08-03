import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
const OneDoor = () => {
  return (
    <div className="body">
      <img src={logo} alt="" className="bgimg" />
      <center>
        <div className="singledoor">
          <DoorUI className="door"></DoorUI>
        </div>
      </center>
    </div>
  );
};

export default OneDoor;
