import React,{useState} from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
function Notif(props) {
    const [showA, setShowA] = useState(true);
  
    const toggleShowA = () => setShowA(!showA);  

    return (
        <ToastContainer position='middle-center'>
          <Toast show={showA} onClose={toggleShowA} bg={props.color}>
            <Toast.Header>
            <strong className="me-auto">Laberinto</strong>
            <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>{props.text}</Toast.Body>
          </Toast>
        </ToastContainer>
    );
  }
  
 export default Notif;
