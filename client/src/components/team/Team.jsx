import React, {Fragment, useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../actions/auth'
import {Row, Col} from 'react-bootstrap'
import './team.css'

const Team = () => {
    const [name2, setName2] = useState('');
    const [name3, setName3] = useState('');
    const [email2, setEmail2] = useState('');
    const [email3, setEmail3] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [mobile3, setMobile3] = useState('');
    var teamName, name1, email1, mobile1;
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    console.log(auth);
     teamName = auth.teamLeader.teamName;
     name1 = auth.teamLeader.name1;
     email1 = auth.teamLeader.email1;
     mobile1 = auth.teamLeader.mobile1;
   const handleSubmit =(e)=> {
      e.preventDefault();
      dispatch(register(teamName,name1,name2,name3,email1,email2,email3,mobile1,mobile2,mobile3))
    }

    return (
        <div className='team-players'>
            <Row className='team-player-row'>
              <form onSubmit = {handleSubmit}>
                <Col lg={5} className="team-player-name">
                    <h3>Member-2</h3>
                    <input
                type="text"
                placeholder="Member-2 Name"
                required
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className='team-member-detail'
              />
              <input
                type="text"
                placeholder="Member-2 Email"
                required
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                className='team-member-detail'
              />
              <input
                type="text"
                placeholder="Member-2 Mobile"
                required
                value={mobile2}
                onChange={(e) => setMobile2(e.target.value)}
                className='team-member-detail'
              />
                </Col>
                <Col lg={5} className="team-player-name">
                <h3>Member-3</h3>
                    <input
                type="text"
                placeholder="Member-3< Name"
                required
                value={name3}
                onChange={(e) => setName3(e.target.value)}
                className='team-member-detail'
              />
              <input
                type="text"
                placeholder="Member-3< Email"
                required
                value={email3}
                onChange={(e) => setEmail3(e.target.value)}
                className='team-member-detail'
              />
              <input
                type="text"
                placeholder="Member-3< Mobile"
                required
                value={mobile3}
                onChange={(e) => setMobile3(e.target.value)}
                className='team-member-detail'
              />
                </Col>
                <button type="submit">Register</button>
                </form>

            </Row>
        </div>
    )
}

export default Team
