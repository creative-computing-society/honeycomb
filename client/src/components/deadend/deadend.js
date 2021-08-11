import "./deadend.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Deadend = () => {
    const history = useHistory();
    const auth = useSelector(state => state.auth);
    const takeBack = () =>{
        history.push(`/maze/${auth.checkpoint}`);
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
