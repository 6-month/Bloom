import React from 'react';
import './Intro.css';
import { Link } from 'react-router-dom';
import logo from '../img/Bloom_logo.png';

function Intro(props) {
    return (
        <Link className="container" to="/bloom">
            <div className="box">
                <img 
                    src={logo}
                    className="logo"
                />
            </div>
        </Link>
    );
}

export default Intro;