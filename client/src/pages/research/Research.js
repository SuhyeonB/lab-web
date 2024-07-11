import React from 'react';
import "../../style/Main.css";

const Research = () => {
    return (
        <div id="main" className="wrapper style">
            <div className="container">
                <div id="content">
                    <h2>project & </h2>
                    <hr />
                        <table>
                            <thead>
                                <tr style={{ border: "none" }}>
                                    <th style={{ width: '20%', padding: '8px', textAlign: 'center' }}>Period</th>
                                    <th style={{ width: '80%', padding: '8px', textAlign: 'center' }}>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*  */}
                                <tr style={{ fontSize:"1em"}}>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    );
};

export default Research;
