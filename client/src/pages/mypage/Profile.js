import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../style/Main.css";
import defaultUserImage from '../../images/cat.jpg';
import { loadUser } from "../../redux/slices/authSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div id="main" className="wrapper style1">
            <div className="container">
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <h2 className="title" style={{ margin: "0" }}>User Profile</h2>
                </div>
                <hr />
                <div className="row" style={{ paddingBottom: "7%" }}>
                    <div className="col-4 col-12-medium" style={{ textAlign: 'center' }}>
                        <img 
                            alt="user" 
                            style={{ borderRadius: "50%", objectFit: "cover", width: "300px", height: "300px" }} 
                            src={user.image || defaultUserImage}
                        />
                    </div>
                    <div className="col-8 col-12-large" style={{ paddingTop: "20px" }}>
                        <div className="col-12" style={{ marginBottom: "20px" }}>
                            <h2>{user.name}</h2>
                        </div>
                        <div className="col-12">
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
