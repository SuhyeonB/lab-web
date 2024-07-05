import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../redux/slices/authSlice';

const Signin = () => {
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
  };

  return (
    <div>
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
        <input type='submit' value='signin' />
      </form>
    </div>
  );
};

export default Signin;
