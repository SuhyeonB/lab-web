import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/slices/authSlice';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SigninBox = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const { email, password } = formData;
      const dispatch = useDispatch();
    
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = async e => {
        e.preventDefault();
        dispatch(signin({ email, password }));
        window.location.replace('/');
      };
    
      const responseGoogle = async (credentialResponse) => {
        try {
          const res = await axios.post('/auth/google', { token: credentialResponse.credential });
          const { access_token, refresh_token } = res.data;
          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('refresh_token', refresh_token);
          window.location.replace('/');
        } catch (error) {
          console.error('Google login failed', error);
        }
      };
    
      const login = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: () => {
          console.log('Login Failed');
        }
      });
    
      return (
        <div id="main" className='wrapper style1'>
          <div className='userBox'>
            <div className='loginBox'>
              <h1>Login</h1>
              <form onSubmit={onSubmit}>
                <div>
                  <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <input type='submit' value='LOG IN' className='button' style={{ width: "100%" }} />
              </form>
                <a href='/signup'>회원가입</a>
                <a href='/findidpwd'>아이디/비밀번호 찾기 &gt;</a>
              <hr />
              <div className="custom-google-button" onClick={() => login()}>
                Continue with Google &nbsp;&nbsp;&nbsp;
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
              </div>
            </div>
          </div>
        </div>
      );
    };

export default SigninBox;