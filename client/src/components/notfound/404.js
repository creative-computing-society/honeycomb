import './404.css'
import meme from '../../images/404meme.jpeg'
const notFound = () => {
  return (
    <div className="not-found">
    <center>
    <img src={meme} alt="" className='meme-error'/>

    </center>
    </div>
  );
};

export default notFound;
