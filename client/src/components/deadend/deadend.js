import "./deadend.css";
import { Link } from "react-router-dom";
const Deadend = () => {
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
        <Link>
          <button className="goback-btn">Go Back</button>
        </Link>
      </center>
    </div>
  );
};

export default Deadend;
