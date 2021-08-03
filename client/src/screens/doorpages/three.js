import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
const ThreeDoors = () => {
  return (
    <div className="body">
    
      <img src={logo} alt="" className="bgimg" />
      <div className="port row1 three">
        <DoorUI className="door"></DoorUI>
      </div>
      <div className="port row1 q2">
        <DoorUI className="door"></DoorUI>
      </div>
      <div className="port row1 three">
        <DoorUI className="door"></DoorUI>
      </div>
      <div className="port row2 q4">
        <DoorUI className="door"></DoorUI>
      </div>
      <div className="port row2 q5">
        <DoorUI className="door"></DoorUI>
      </div>
    </div>
  );
};

export default ThreeDoors;