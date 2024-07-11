import React, {useState, useRef} from "react";
import "../../style/Main.css";
import ex from '../../images/ex.jpg';
import {Link} from "react-router-dom";

function ProfileUpdate() {
    const User = [{id: 1, name: "정도현", nickName: "DAVE", interest: "Frontend", birthDate: "2002-07-10", tellNum: "010-2637-4085", email: "20211503@daegin.ac.kr", passwd: "dv1234"}];

    const [pwdMatched, setpwdMatched] = useState(false)
    const [fileImage, setFileImage] = useState(ex);

    const uploadRef = useRef();
    const intRef = useRef();
    const pwdRef = useRef();
    const pwd2Ref = useRef();

    /*
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };*/

    const confirmMatching = () => {
        if (pwdRef.current.value === pwd2Ref.current.value) setpwdMatched(true);
        else setpwdMatched(false)
    }

    const PwdUpdate = () => {
        if(!setpwdMatched) {
            alert("Password is not matched.\n Can not change the password")
        } else {
            User[0].passwd = pwdRef.current.value;
            alert("Password is changed")
        }
    }
    const intUpdate = () => {
        User[0].interest = intRef.current.value;
    }

    return (
        <div id="main" className="wrapper style1">
            <div className="container">
                <h2 className="title">User Profile Update</h2>
                <hr/>
                <div className="row" style={{paddingBottom: "7%"}}>
                    <div className="col-4 col-12-medium" style={{textAlign: 'center'}}>
                        <div>
                        {fileImage && (
                            <img style={{borderRadius: "80%", objectFit: "cover", width: "250px", height: "250px", marginTop: "2em"}} src={fileImage} alt="profileImg" />
                        )}
                        <br/>
                        <button type="button" className="button" onClick={()=>{ uploadRef.current.click()}}>
                            사진 변경
                        </button>
                        <input name="imgUpload" type="file" accept="image/*"  ref={uploadRef} onChange={(e) => {setFileImage(URL.createObjectURL(e.target.files[0]))}} style={{display: "none"}}/>
                        </div>
                        <br/>
                        <button type="button" className="button">
                            <Link to='/profile'>돌아가기</Link>
                        </button>
                        <br/>
                        <button type="button" className="button">
                            탈퇴하기
                        </button>
                    </div>

                    <div className="col-8 col-12-large">

                        <table className="table-wrapper">
                            <thead className="align-center">
                                <td></td>
                                <td></td>
                                <td></td>
                            </thead>
                            <tbody id="tbody">
                                <tr className="align-center">
                                    <td> NAME </td>
                                    <td> {User[0].name} </td>
                                    <td></td>
                                </tr>
                                <tr className="align-center">
                                    <td> NICKNAME </td>
                                    <td> {User[0].nickName} </td>
                                    <td>
                                        <button type="button" className="button">중복 검사</button>
                                    </td>
                                </tr>
                                <tr className="align-center">
                                    <td> ID </td>
                                    <td> {User[0].id} </td>
                                    <td>
                                    </td>
                                </tr>
                                <tr className="align-center">
                                    <td> PASSWORD </td>
                                    <td>
                                        <input type="password" id="password" ref={pwdRef}/>
                                    </td>
                                    <td>
                                        {pwdMatched && <i style={{color : "greenyellow"}}>V</i>}
                                    </td>
                                </tr>
                                <tr className="align-center">
                                    <td></td>
                                    <td>
                                    <input type="password" id="password" ref={pwd2Ref} onChange={confirmMatching}/>
                                    </td>
                                    <td>
                                        <button type="button" className="button" onClick={PwdUpdate}>변경</button>
                                    </td>
                                </tr>
                                <tr className="align-center">
                                    <td> INTEREST </td>
                                    <td>
                                        <input type="text" placeholder={User[0].interest} ref={intRef} required />
                                    </td>
                                    <td>
                                        <button type="button" className="button" onClick={intUpdate}>변경</button>
                                    </td>
                                </tr>
                                <tr className="align-center">
                                    <td> EMAIL </td>
                                    <td> {User[0].email} </td>
                                    <td>
                                        <button type="button" className="button">인증하기</button>
                                    </td>
                                </tr>
                                <tr className="align-center">
                                    <td> PHONE NUMBER </td>
                                    <td> {User[0].tellNum} </td>
                                    <td>
                                        <button type="button" className="button">인증하기</button>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileUpdate;