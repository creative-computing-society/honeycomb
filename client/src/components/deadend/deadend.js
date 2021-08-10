import "./deadend.css";
import { Link, useHistory } from "react-router-dom";
const Deadend = () => {
    const history = useHistory();
    const takeBack = () =>{
        history.go(-2);
    }
  return (
    <div className="deadend-main">
      <center>
        <img
          className="deadend-img"
          src="https://media.giphy.com/media/dZj5EUDn0OPDZDbNJ4/giphy.gif"
          alt=""
        />
      </center>
      <center>
       
          <button onClick={takeBack} className="goback-btn">Go Back</button>
     
      </center>
    </div>
  );
};

export default Deadend;
