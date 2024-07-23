import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!sessionStorage.getItem('access_token')) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signout());
        alert('로그아웃되었습니다.');
        window.location.reload();
    }

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
                        &nbsp;&nbsp;&nbsp;
                        {isLoggedIn ?
                            <>
                                <button className="button active" onClick={logout}>LOG OUT</button>
                                <Link to='/profile' id="circle-3" style={{ backgroundImage: `url(${user ? user.image : 'default_image_url'})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%', width: '50px', height: '50px' }} />
                            </>
                            :
                            <a href="/signin" className="button active" role="button">LOG IN</a>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;