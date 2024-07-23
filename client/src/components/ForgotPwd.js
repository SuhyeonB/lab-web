import React, { useState } from 'react';
import axios from 'axios';

const ForgotPwd = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('/api/users/forgot-password', { email });
            setMessage(response.data.message);
            alert(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
                alert(error.response.data.message);
            } else {
                setMessage('Failed to reset password.');
                alert('Failed to reset password.');
            }
        }
    };

    return (
        <div id="main" className='wrapper style1'>
          <div className='userBox' style={{height:"20em"}}>
            <div className="forgotpwd-container">
                <h2>Forgot the Password</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <button className='button' onClick={handleResetPassword}>Send</button>
                <p>{message}</p>
            </div>
          </div>
        </div>
    );
};

export default ForgotPwd;
