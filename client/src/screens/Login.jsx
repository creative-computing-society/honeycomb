import React, { useState } from "react";
// import "font-awesome/css/font-awesome.min.css";
import { func } from "prop-types";
import { useHistory } from "react-router";
import { register } from "../actions/auth";
import { useDispatch } from "react-redux";

const handleRegister = (params = {}, handleChangeInLogin, history, handleError) => {

};

const handleLogin = (params = {}, handleChangeInLogin, history, handleError) => {

}

const Login = ({ handleChangeInLogin }) => {
  const history = useHistory();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    let name = target.name;
    let value = target.value;
    setRegister(prevState => ({ ...prevState, [name]: value }))
  };

  const handleChangeLogin = ({ target }) => {
    setLogin(prevState => ({ ...prevState, [target.name]: target.value }))
  };

  const handleError = (error) => {
    setError(error);
  }
  const [teamName, setTeamName] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [name3, setName3] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [mobile3, setMobile3] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(register({
      teamName,
      name1, name2, name3,
      email1, email2, email3,
      mobile1, mobile2, mobile3
    }))

  }





  return (
    <>
      <div className="container1">
        <div className="forms-container1">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={(event) => { event.preventDefault(); handleLogin(login, handleChangeInLogin, history, handleError) }} >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <span></span>
                <input required type="text" placeholder="Username" name="username" onChange={handleChangeLogin} />
              </div>
              <div className="input-field">
                <span></span>
                <input required type="password" placeholder="Password" name="password" onChange={handleChangeLogin} />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <label style={{ color: "red" }}>{error}</label>
            </form>

            <form className="sign-up-form" onSubmit={ handleSubmit} >
              <label>Team Name:</label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />

              <label>Team Leader:</label>
              <input
                type="text"
                required
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />

              <label>Name of Member 2:</label>
              <input
                type="text"
                required
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
              <label>Name of Member 3:</label>
              <input
                type="text"
                value={name3}
                onChange={(e) => setName3(e.target.value)}
              />
              <label>Email 1:</label>
              <input
                type="email"
                required
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />

              <label>Email 2:</label>
              <input
                type="email"
                required
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
              <label>Email 3:</label>
              <input
                type="email"
                value={email3}
                onChange={(e) => setEmail3(e.target.value)}
              />
              <label>Mobile Number 1:</label>
              <input
                type="text"
                required
                value={mobile1}
                onChange={(e) => setMobile1(e.target.value)}
              />
              <label>Mobile Number 2:</label>
              <input
                type="text"
                required
                value={mobile2}
                onChange={(e) => setMobile2(e.target.value)}
              />
              <label>Mobile Number 3:</label>
              <input
                type="text"
                value={mobile3}
                onChange={(e) => setMobile3(e.target.value)}
              />
              <button>Register</button>
            </form>
          </div>
        </div>

        <div className="panels-container1">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                “A journey of a thousand miles begins with a single step.”{" "}
                <br />
                —Lao Tzu
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={() => document.querySelector(".container1").classList.add("sign-up-mode")}>
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                “A room without books is like a body without a soul.” <br />~
                Cicero
              </p>
              <button className="btn transparent" id="sign-in-btn" onClick={() => document.querySelector(".container1").classList.remove("sign-up-mode")}>
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

Login.propType = {
  handleChangeInLogin: func.isRequired
}

export default Login;