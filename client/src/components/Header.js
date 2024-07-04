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
                        <li><Link to='/member'>MEMBER</Link></li>
                        <li><Link to='/research'>RESEARCH</Link></li>
                        <li><Link to='/contact'>CONTACT</Link></li>
                        <li><Link to='/board'>BOARD</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;