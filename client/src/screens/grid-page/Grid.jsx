import React from 'react'
import { Fragment } from 'react'
import './grid.css'
import Typewriter from 'typewriter-effect';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Grid = () => {

    const user = useSelector(state => state.auth.user);
    const room = user.room || 0;

    return (
        <Fragment>
            <div className='grid-body'>
             <div class="wrap">
        
        <div class="top-plane"></div>
        <div class="bottom-plane"></div>
        <div class="typewriter">
        <Link to ={'/maze/'+room}> <button class="bu" > {'< ENTER THE MAZE > '}</button> </Link>

        </div>

    </div>
    
    </div>
        </Fragment>
    )
}

export default Grid
