import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/auth';
import logo from '../images/logo.png'
import Rules from "./rulebook";

const Navbar = () => {
  const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = () => {
      dispatch(logout());
    }

  const teamPoints = (auth.user && auth.user.team.score) || 0;
  const teamName = (auth.user && auth.user.team.teamName) || 'Team Name';
    return ( 
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark  fixed-top shift">
        <div className="container">
          <Link to='/' className="navbar-brand" ><img src={logo} alt='logo' className='logo-img'/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">

            {!auth.isAuthenticated? 
              <li className="nav-item">
                <Link className='nav-link' to = '/login'>Register Now</Link>
              </li> :
              <li className ='nav-item'>
              <p className='nav-link'>{teamName}</p></li>}
              {!auth.isAuthenticated? 
              <li className="nav-item">
              <a className='nav-link' href = '/#sponsors'>Our Sponsors</a>
              </li> : <li className='nav-item'><p  className='nav-link'>Total Points: {teamPoints}</p></li>}
              <li className="nav-item">
                <Link className="nav-link" to='/rulebook'>Rulebook</Link>
              </li>
              {auth.isAuthenticated? 
              <li className="nav-item" onClick={logoutHandler}>
              <a className="nav-link" href="#">Logout</a>
            </li>: ''}
            </ul>
          </div>
        </div>
      </nav>
        </div>
     );
}
 
export default Navbar;