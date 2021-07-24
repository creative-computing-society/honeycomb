import React, { useState } from "react";
// import "font-awesome/css/font-awesome.min.css";
import { func } from "prop-types";
import { useHistory } from "react-router";
import { register } from "../actions/auth";
import { useDispatch } from "react-redux";

const handleRegister = (
  params = {},
  handleChangeInLogin,
  history,
  handleError
) => {};

const handleLogin = (
  params = {},
  handleChangeInLogin,
  history,
  handleError
) => {};

const Login = ({ handleChangeInLogin }) => {
  const history = useHistory();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    let name = target.name;
    let value = target.value;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeLogin = ({ target }) => {
    setLogin((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleError = (error) => {
    setError(error);
  };
  const [teamName, setTeamName] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [mobile3, setMobile3] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(
      register({
        teamName,
        name1,
        name2,
        name3,
        email1,
        email2,
        email3,
        mobile1,
        mobile2,
        mobile3,
      })
    );
  };

  return (
    <>
      <div className="container1">
        <div className="forms-container1">
          <div className="signin-signup">
            <div className="container">
              <form
                className="sign-in-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleLogin(login, handleChangeInLogin, history, handleError);
                }}
              >
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <span></span>
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChangeLogin}
                  />
                </div>
                <div className="input-field">
                  <span></span>
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChangeLogin}
                  />
                </div>
                <input type="submit" value="Login" className="btn solid" />
                <label style={{ color: "red" }}>{error}</label>
              </form>
            </div>

            <div className="container regform">
              <form className="sign-up-form" onSubmit={handleSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="row">
                  <input
                    type="text"
                    className="input-signup"
                    placeholder="Team Name"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <h3 className="reghead">Player 1:</h3>
                    <input
                      type="text"
                      required
                      className="input-signup"
                      placeholder="Name of Team Leader"
                      value={name1}
                      onChange={(e) => setName1(e.target.value)}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email 1"
                      className="input-signup"
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Mobile 1"
                      required
                      className="input-signup"
                      value={mobile1}
                      onChange={(e) => setMobile1(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <h3 className="reghead">Player 2:</h3>
                    <input
                      type="text"
                      required
                      className="input-signup"
                      placeholder="Name 2"
                      value={name2}
                      onChange={(e) => setName2(e.target.value)}
                    />
                    <input
                      type="email"
                      required
                      className="input-signup"
                      value={email2}
                      placeholder="Email 2"
                      onChange={(e) => setEmail2(e.target.value)}
                    />

                    <input
                      type="text"
                      required
                      placeholder=" Mobile 2"
                      className="input-signup"
                      value={mobile2}
                      onChange={(e) => setMobile2(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <h3 className="reghead">Player 3:</h3>
                    <input
                      placeholder="Name 3"
                      type="text"
                      value={name3}
                      className="input-signup"
                      onChange={(e) => setName3(e.target.value)}
                    />
                    <input
                      type="email"
                      value={email3}
                      placeholder="Email 3"
                      className="input-signup"
                      onChange={(e) => setEmail3(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Mobile 3"
                      value={mobile3}
                      className="input-signup"
                      onChange={(e) => setMobile3(e.target.value)}
                    />
                  </div>
                </div>

                <button className="btn solid">Register</button>
              </form>
            </div>
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
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() =>
                  document
                    .querySelector(".container1")
                    .classList.add("sign-up-mode")
                }
              >
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
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() =>
                  document
                    .querySelector(".container1")
                    .classList.remove("sign-up-mode")
                }
              >
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

Login.propType = {
  handleChangeInLogin: func.isRequired,
};

export default Login;
