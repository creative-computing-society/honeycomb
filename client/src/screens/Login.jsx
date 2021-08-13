import React, { Fragment, useState, useEffect } from "react";
// import "font-awesome/css/font-awesome.min.css";
import { func } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { login, saveTeamLeader } from '../actions/auth'
import {useHistory} from 'react-router'
import {NEW_REGISTER, REGISTER_ERROR_RESET} from '../actions/types'
import Notif from "../components/Toast/LoginToast";

const Login = () => {

  const [teamName, setTeamName] = useState('');
  const [name1, setName1] = useState('');
  const [email1, setEmail1] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory()
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  if(auth.isAuthenticated){
    history.push('/')
  }

  useEffect(()=>{
    dispatch({
      type: NEW_REGISTER
    })
    dispatch({
      type: REGISTER_ERROR_RESET
    })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveTeamLeader(teamName,name1,email1,mobile1));
    history.push('/team-registration');
  }
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, password));
  }

  return (
    <Fragment>
      <div className="container1">
        <div className="forms-container1">
          <div className="signin-signup">
          <form className="sign-in-form sign-in-form-1" onSubmit={ handleSubmit} >
            <h2 className="title">Sign up</h2>

              <input
                type="text"
                placeholder="Team Name"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className='team-name team-lead-deets'
              />

              <input
                type="text"
                placeholder="Team Leader"
                required
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className='team-leader team-lead-deets'
              />
              <label>Please use your Thapar email id</label>
              <input
                type="email"
                required
                placeholder="example@thapar.edu"
                value={email1}
                className = "team-lead-deets"
                onChange={(e) => setEmail1(e.target.value)}
              />

              <input
                type="text"
                placeholder="Discord ID (name#xxxx)"
                required
                value={mobile1}
                className="team-lead-deets"
                onChange={(e) => setMobile1(e.target.value)}
              />
                <button type='submit'className="btn solid">Register</button>
            </form>
            <form className="sign-up-form sign-up-form-1" onSubmit={handleSubmitLogin} >
              <h2 className="title">Sign in</h2>
              {/* <h4 style={{textAlign:"center", color:"red"}}>You would be able to sign in once the event begins.</h4> */}
              <div className="input-field">
                <span></span>
                <input required type="text" disabled placeholder="Email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <span></span>
                <input required type="password" disabled placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <input type="submit" value="Login" disabled className="btn solid" />
              {/* <label style={{ color: "red" }}>{error}</label> */}
            </form>

            

          </div>
        </div>

        <div className="panels-container1">
          <div className="panel left-panel">
          <div className="content">
          <h3 className="hide">One of us ?</h3>
              <p className="hide">
                "Sign in, and enter the maze.Get Ready, to GET LOST" <br />~
                
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() =>
                  document
                    .querySelector(".container1")
                    .classList.add("sign-up-mode")
                }
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="panel right-panel">
          
            <div className="content">
         
              <h3 className="hide">New here ?</h3>
              <p className="hide">
                “A journey of a thousand miles begins with a single step.”{" "}
                <br />
                Sign up, to get lost in the maze.
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() =>
                  document
                    .querySelector(".container1")
                    .classList.remove("sign-up-mode")
                }
              >
                Sign up
              </button>
            </div>
            
          </div>
        </div>
      </div>
      {auth.error && auth.error.map((error) => {
        return (
          <Notif text={error} color='danger'/>
        )
      })}
    </Fragment>
  );
};

Login.propType = {
  handleChangeInLogin: func.isRequired,
};

export default Login;
