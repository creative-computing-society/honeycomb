import './registerButton.css';
import { Link } from "react-router-dom";


const RegisterButton=()=>{
  return(
    <div className='regbut'>
       <section className="buttons">
         <Link className='nav-link' to = '/login'>
         <button className="registerbtn btn solid" >Register</button>

         </Link>

       </section>
     </div>
  );
}
export default RegisterButton;
