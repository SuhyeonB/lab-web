import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../style/Board.css';
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, deletePost } from '../../redux/slices/postSlice'; // Import redux actions


const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(state => state.posts.post); // Get post from redux state
    const user = useSelector(state => state.auth.user); // Get user from redux state

    const [date, setDate] = useState('');

    useEffect(() => {
        if (post && post.createdAt) {
            setDate(post.createdAt.substr(0, 10));
        }
    }, [post]);

    useEffect(() => {
        dispatch(fetchPost(id)); // Fetch post using redux
    }, [dispatch, id]);

    const onDelete = async (e) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            e.preventDefault();
            alert("삭제되었습니다.");
            await dispatch(deletePost(id)); // Delete post using redux
            navigate('/board');
        }
    }

    const auth = user ? true : false; // Check if user is authenticated

    // Check if post is loaded
    if (!post) {
        return <div>Loading...</div>; // You can also add a more sophisticated loading spinner here
    }

    const isAuthor = user && post.writer === user.name; // Check if the logged-in user is the author

    return (
        <div id='main' className='wrapper style'>
            <div className='container posthead'>
                <div className='posttitle'>
                    <h3> {post.title} </h3>
                </div>
                <div className='postInfo'>
                    <dl className='writer'>
                        <dt> WRITER </dt>
                        <dd> {post.writer ? post.writer : ''} </dd> {/* Show writer name */}
                    </dl>
                    <dl className='date'>
                        <dt> DATE </dt>
                        <dd> {date} </dd>
                    </dl>
                    {/* 
                    <div className='icons'>
                        <i className='icon fa-light fa-bookmark fa-lg bookmark' />
                        <i className='fas fa-regular fa-heart fa-lg like'/>
                    </div>
                    */}
                </div>
                <hr/>
            </div>
            <div className="container postbody">
                <div id='content' style={{whiteSpace: "pre-line", padding: "1em"}}>
                    {HTMLReactParser(post.content ? post.content : '')} {/* Parse HTML content */}
                </div>
            </div>
            <div className='container'>
                {   
                    auth && isAuthor ? 
                    <div className='buttonbox'>
                        <Link to={'/post/update'} className="button" state={{ pId : id }}>수정</Link>
                        <button type="button" className="button" onClick={(e) => onDelete(e)}>삭제</button>
                        <Link to='/board' className='button'>뒤로</Link>
                    </div>
                    :
                    <div className='buttonbox'>
                        <Link to='/board' className='button'>뒤로</Link>
                    </div>
                }
            </div>
            
        </div>
    );
};

export default PostPage;
