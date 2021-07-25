import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark  fixed-top shift">
        <div className="container">
          <Link to='/' className="navbar-brand" >Laberinto</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className='nav-link' to = '/login'>Register Now</Link>
              </li>
              <li className="nav-item">
              <Link className='nav-link' to = '/#sponsors'>Our Sponsors</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Rulebook</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        </div>
     );
}
 
export default Navbar;