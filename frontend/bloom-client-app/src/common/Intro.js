import React from 'react';
import './Intro.css';
import { Link } from 'react-router-dom';

function Intro(props) {
    return (
        <Link className="container" to="/login">
            <div className="box">
                
            </div>
        </Link>
    );
}

export default Intro;