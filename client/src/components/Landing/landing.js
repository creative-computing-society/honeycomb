import {useEffect} from 'react';
import './Landing.css';
import Countdown from '../Countdown/countdown.js';
import Sponsors from '../Sponsors/sponsors.js';
import RegisterButton from '../RegisterButton/registerButton.js';

const Landing =()=>{
    useEffect(()=>{
      window.onload = () => {
          let scrollPos,
              landing = document.getElementById('landing'),
              bg = document.getElementById('bg');
          let scrollFunctions = {
              "scrollPos": () => { scrollPos = window.scrollY; },
              "parallax": () => {
                  let blur = Math.min(scrollPos / landing.clientHeight, 1) * 5;
                  let scale = (scrollPos / 3000) + 1;

                  bg.style.filter = 'blur('+blur+'px)';
                  bg.style.transform = 'scale('+scale+')';
                  bg.style.backgroundPosition = '0px '+ scrollPos / 2 + 'px';
              }
          }
          window.addEventListener('scroll', (e) => {
              window.requestAnimationFrame(scrollFunctions.scrollPos);
              window.requestAnimationFrame(scrollFunctions.parallax);
          });
      }
    },[]);
    return(
  <div className = "main">
    <div id="landing">
      <div id="bg">
        <Countdown></Countdown>
        <br/>
        <RegisterButton></RegisterButton>
      </div>
    </div>
      <div className="sponsors">
        <Sponsors></Sponsors>
      </div>
  </div>
    );
}
export default Landing;
