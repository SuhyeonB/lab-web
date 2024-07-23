import React from "react";
import "../style/Main.css";

function Footer() {
    return (
        <div id="footer">
            <ul className="icons">
                <li><a href="https://github.com/DB-LAB-Daejin" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="https://ce.daejin.ac.kr/ce/2514/subview.do" className="icon solid alt fa-envelope"><span className="label">Email</span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; Untitled. All rights reserved.</li>
                <li>Design: <a href="/">DB LAB</a></li>
            </ul>
        </div>
    );
}

export default Footer;