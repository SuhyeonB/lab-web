import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../style/User.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            alert('패스워드가 일치하지 않습니다.');
        } else {
            dispatch(Signup({ name, email, password }));
        }
    }
    
    return (
        <div id="main" className="wrapper style1">
            <div className="userBox" style={{width:"60vw"}}>
                <div className='signupBox'>
                    <h3 style={{fontWeight:"800"}}>SIGN UP</h3>
                    <form onSubmit={onSubmit}>
                        <h5> NAME </h5>
                        <div className='line'>
                            <input type="text" name='name' value={name} className="text" onChange={onChange} required/>
                        </div>
                        <h5> EMAIL </h5>
                        <div className='line'>
                            <input type="email" name='email' value={email} className="email" onChange={onChange} required/>
                            {/*<button className='button' onClick={sendEmail}>인증번호 발송</button>*/}
                        </div>
                        {/* 
                        <h5> VERIFICATION CODE </h5>
                        <div className='line'>
                            <input type="text" className="text" ref={veriRef}/>
                            <button className='button' onClick={onVerify}> 확인 </button>
                        </div>
                        */}
                        <h5 style={{marginTop: "2em"}}> PASSWORD </h5>
                        <input type="password" name='password' value={password} className="password" onChange={onChange} required/>
                        <p style={{color: '#e44c65', marginBottom:'1em'}}>
                            ※ 8~16자의 영문, 숫자, 기호 조합일 것
                        </p>
                        <input type="password" name='password2' value={password2} className="password" onChange={onChange} required/>

                        {/* <input type="password" className="password" ref={pwdRef} onChange={confirmMatching}/>
                        {pwdMatched && <i style={{color : "greenyellow"}}>V</i>} */}
                        
                        <input type='submit' value='Signup' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;