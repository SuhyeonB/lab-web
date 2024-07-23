import React from "react";
import "../../style/Main.css";
import defaultImg from '../../images/pic01.jpg';

const Member = () => {
    const members = [['박동주',2, defaultImg], ['정명주', 3, defaultImg], ['정도현', 4, defaultImg], ['최준영', 5, defaultImg], ['봉수현', 6, defaultImg], ['조민정', '7', defaultImg]]

    return (
        <div id="main" className="wrapper style">
            <div className="container">
                <div id="content">
                    <h2>Professor</h2>
                    <hr />
                    <div className="row" style={{ paddingBottom: "10%" }}>
                        <div className="col-4 col-12-medium">
                            <img alt="prof" style={{ borderRadius: "80%", objectFit: "cover" }} src={defaultImg} />
                        </div>
                        <div className="col-8 col-12-large">
                            <h2>신판섭</h2>
                            <div className="col-8 col-12-small" style={{ display: "flex" }}>
                                <div className="col-8 col-12-small" style={{ width: "300px" }}>
                                    <p>전공</p>
                                    <p>소속 학회</p>
                                    <br />
                                    <p>연구 분야</p>
                                    <p>학력 사항</p>
                                </div>
                                <div className="col-8 col-12-small" style={{ color: '#e44c65' }}>
                                    <p>[컴퓨터공학전공] 데이터베이스 시스템</p>
                                    <p>한국멀티미디어학회, 한국인터넷정보학회, 한국정보처리학회, 한국컴퓨터정보학회, 한국디지털정책학회, 한국창의정보문화학회</p>
                                    <p>분산 객체 데이터베이스, 멀티미디어 시스템, 시맨틱 웹</p>
                                    <p>박사 : 홍익대학교, 데이터베이스시스템 전공, 2000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>Members</h2>
                    <hr />
                    <div className="row members" style={{ flexWrap: "wrap" }}>
                    <div className="row members">
                            <div className="col-4 col-12-medium mem" style={{textAlign:"center", marginBottom: "20px"}}>
                                <h4 style={{color: "red"}}>한석희</h4>
                                <img alt="m01" style={{borderRadius: "80%", objectFit: "cover", width: "200px"}} src={defaultImg} />
                            </div>
                            {members.map(function(mem){
                                return(
                                    <div className="col-4 col-12-medium mem" style={{textAlign:"center", marginBottom: "20px"}}>
                                    <h4>{mem[0]}</h4>
                                    <img alt={mem[1]} style={{borderRadius: "80%", objectFit: "cover", width: "200px"}} src={mem[2]}/>
                                </div>
                                )
                            }) }
                            
                        </div>
                    </div>
                    <h2 style={{ marginTop: "2em" }}>Alumni</h2>
                    <hr />
                    <div className="row alumni" style={{ flexWrap: "wrap" }}>
                        {/* Alumni content goes here */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Member;