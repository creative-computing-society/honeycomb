import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Link } from '@material-ui/core';


const ThankYou = () => {
    return ( 
        <div className="thanks rulebook-page">
            <div className="rulebook-main thankyou-main">
            <center>
                <h3 className="title ty-title">The Maze has Closed.</h3>
            </center>
            <center>
                <h3 className="title ty-title2">Thank you for participating.</h3>
            </center>
            <center>
                <h3 className='title'>
                    Follow us:
                </h3>
            </center>
            <center className='icons'>
                <a href='www.instagram.com/ccs_tiet/' className='social-icons-thanks'>
                    <InstagramIcon fontSize='large'/>

                </a >
                <a href='' className="social-icons-thanks">
                <LinkedInIcon fontSize='large'/>
                    
                </a >
                <a href='' className="social-icons-thanks">
                <YouTubeIcon fontSize='large'/>
                    
                </a >
                <a href='' className="social-icons-thanks">
                <GitHubIcon fontSize='large'/>
                </a>
            </center>
            </div>
            
        </div>
     );
}
 
export default ThankYou;