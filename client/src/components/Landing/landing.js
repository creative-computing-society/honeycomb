import React, {useEffect, Fragment} from 'react';
import './Landing.css';
import Countdown from '../Countdown/countdown.js';
import Sponsors from '../Sponsors/sponsors.js';
import RegisterButton from '../RegisterButton/registerButton.js';
import Notif from '../Toast/LoginToast'
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Grid from '../../screens/grid-page/Grid';

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

    const auth = useSelector(state => state.auth);

    const isSuccess = (auth.success!==null);
    const isError = (auth.error!==null);

    console.log(isSuccess, isError);  
    return(
      <Fragment>

       {auth.isRegistered && isSuccess ?  (<Notif text={auth.success} color='light'/>) : ''}

  <div className = "main">
    <div id="landing">
      {auth && auth.isAuthenticated ? 
      <Grid/>
       :
      <div id="bg">
        <Countdown></Countdown>
        <br/>
        <RegisterButton></RegisterButton>
      </div>}
    </div>
      <div className="sponsors">
        <Sponsors></Sponsors>
      </div>
  </div>
  {/* {auth.error && auth.error.map((error) => {
        return (
          <Notif text={error} color='danger'/>
        )
      })} */}
  </Fragment>
    );
}
export default Landing;
