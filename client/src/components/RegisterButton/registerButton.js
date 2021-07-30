import './registerButton.css';
import { Link } from "react-router-dom";


const RegisterButton=()=>{
  return(
    <div className='regbut'>
       <section className="buttons">
         <Link className='nav-link' to = '/login'>
         <button className="btn solid" >Register Now</button>

         </Link>

       </section>
     </div>
  );
}
export default RegisterButton;
