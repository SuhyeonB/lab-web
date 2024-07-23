import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';
import '../style/User.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    let history = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [emailSent, setEmailSent] = useState(false);
    const [emailCode, setEmailCode] = useState('');
    const [veriCode, setVeriCode] = useState('');
    const [emailVeri, setEmailVeri] = useState(false);
    const [timer, setTimer] = useState(300); // 5분 타이머 설정

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const sendVerification = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            });
            if (response.ok) {
                const data = await response.json();
                setEmailCode(data.code); // 서버에서 반환한 코드 저장
                setEmailSent(true);
                setTimer(300); // 타이머 리셋
                alert('인증 코드가 발송되었습니다.');
            } else {
                throw new Error('인증 코드 발송 실패');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        let interval;
        if (emailSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setEmailSent(false);
            alert('인증 시간이 만료되었습니다. 다시 시도해 주세요.');
        }
        return () => clearInterval(interval);
    }, [emailSent, timer]);

    const verifyCode = () => {
        if (emailCode === veriCode) {
            
            setEmailVeri(true);
            alert('인증 성공');
        } else {
            alert('인증 실패');
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            alert('패스워드가 일치하지 않습니다.');
            return;
        }
        if (!emailVeri) return;
        dispatch(signup({ name, email, password }))
            .unwrap()
            .then(() => {
                history('/signin');
            })
            .catch(rejectedValueOrSerializedError => {
                alert(rejectedValueOrSerializedError);
            });
    };

    const formatTimer = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div id="main" className="wrapper style1">
            <div className="userBox" style={{ width: "60vw" }}>
                <div className='signupBox'>
                    <h3 style={{ fontWeight: "800" }}>SIGN UP</h3>
                    <form onSubmit={onSubmit}>
                        <h5> NAME </h5>
                        <div className='line'>
                            <input type="text" name='name' value={name} className="text" onChange={onChange} required />
                        </div>
                        <h5> EMAIL </h5>
                        <div className='line'>
                            <input type="email" name='email' value={email} className="email" onChange={onChange} required />
                            <button type='button' className='button' onClick={sendVerification} disabled={emailSent}>인증 메일 전송</button>
                        </div>
                        <h5> VERIFICATION CODE </h5>
                        <div className='line'>
                            <input type="text" name='emailCode' value={veriCode} className="text" onChange={(e) => setVeriCode(e.target.value)} />
                            <button type='button' className='button' onClick={verifyCode}>확인</button>
                            {emailSent && <span style={{ marginLeft: '10px' }}>남은 시간: {formatTimer()}</span>}
                        </div>
                        <h5 style={{ marginTop: "2em" }}> PASSWORD </h5>
                        <input type="password" name='password' value={password} className="password" onChange={onChange} required />
                        <p style={{ color: '#e44c65', marginBottom: '1em' }}>
                            ※ 8~16자의 영문, 숫자, 기호 조합일 것
                        </p>
                        <input type="password" name='password2' value={password2} className="password" onChange={onChange} required />
                        <input type='submit' value='Signup' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
