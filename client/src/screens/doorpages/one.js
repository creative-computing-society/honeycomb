import DoorUI from "../../components/Portal/portal";
import logo from "../../images/logo.png";
import "./main.css";
import { Link, useHistory } from "react-router-dom";

const OneDoor = () => {
  const history = useHistory();
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
