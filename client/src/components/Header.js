import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    
    return (
        <div id="header">
            <h1 id="logo">
                <a href='https://ce.daejin.ac.kr/ce/index.do' rel="noreferrer" target="_blank">DAEJIN CE</a>
            </h1>
            <nav>
                <div id='nav'>
                    <ul>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/'>MEMBER</Link></li>
                        <li><Link to='/'>RESEARCH</Link></li>
                        <li><Link to='/'>CONTACT</Link></li>
                        <li><Link to='/'>BOARD</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;