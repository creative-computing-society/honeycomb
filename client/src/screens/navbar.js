import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/auth';
import logo from '../images/logo.png'

const Navbar = () => {
  const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = () => {
      dispatch(logout());
    }

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
              <p className='nav-link'>Team Name</p></li>}
              {!auth.isAuthenticated? 
              <li className="nav-item">
              <a className='nav-link' href = '/#sponsors'>Our Sponsors</a>
              </li> : <li className='nav-item'><p  className='nav-link'>Total Points</p></li>}
              <li className="nav-item">
                <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1PUDP08kfEThypSuh_D9HbnQQujKw1V1k/view?usp=sharing">Rulebook</a>
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