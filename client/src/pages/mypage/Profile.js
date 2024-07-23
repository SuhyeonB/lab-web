import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateProfile, loadUser, deleteAccount } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import '../../style/Mypage.css'; 

const Profile = () => {
    const serverBaseURL = 'http://localhost:8080';

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            dispatch(loadUser()).catch((error) => {
                console.log('Failed to load user, navigating to login.');
                navigate('/login');
            });
        }
    }, [dispatch, navigate, user]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            
            const relativeImagePath = user.image.replace('server/images/', '');
            const imageUrl = `${serverBaseURL}/images/${relativeImagePath}`;
            setPreview(imageUrl);
        }
    }, [user]);

    const handleDeleteAccount = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            dispatch(deleteAccount());
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPreview(response.data.path);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload image', error);
            alert('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);

        dispatch(updateProfile(formData));
    };

    return (
        <div id="main" className="wrapper style1">
            <div className="container">
                <div className="mypage-container">
                    <h1>My Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Profile Image:</label>
                            <input type="file" onChange={handleImageChange} />
                            {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
                        </div>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        
                        <button type="submit">Update Profile</button>
                    </form>
                    <button onClick={handleDeleteAccount}>Delete My Account</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
