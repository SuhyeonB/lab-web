import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../style/Board.css';
import HTMLReactParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, deletePost } from '../../redux/slices/postSlice';
import Comment from './Comment';

const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(state => state.posts.post);
    const user = useSelector(state => state.auth.user);

    const [date, setDate] = useState('');

    useEffect(() => {
        if (post && post.createdAt) {
            setDate(post.createdAt.substr(0, 10));
        }
    }, [post]);

    useEffect(() => {
        dispatch(fetchPost(id)); 
    }, [dispatch, id]);

    const onDelete = async (e) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            e.preventDefault();
            await dispatch(deletePost(id)); 
            alert("삭제되었습니다.");
            navigate('/board');
        }
    }

    const auth = !!user;

    if (!post) {
        return <div>Loading...</div>;
    }

    const isAuthor = user && post.writer === user.name;

    return (
        <div id='main' className='wrapper style'>
            <div className='container posthead'>
                <div className='posttitle'>
                    <h3> {post.title} </h3>
                </div>
                <div className='postInfo'>
                    <dl className='writer'>
                        <dt> WRITER </dt>
                        <dd> {post.writer ? post.writer : ''} </dd>
                    </dl>
                    <dl className='date'>
                        <dt> DATE </dt>
                        <dd> {date} </dd>
                    </dl>
                </div>
                <hr/>
            </div>
            <div className="container postbody">
                <div id='content' style={{ whiteSpace: "pre-line", padding: "1em" }}>
                    {HTMLReactParser(post.content ? post.content : '')}
                </div>
            </div>
            <div className='container'>
                {   
                    auth && isAuthor ? 
                    <div className='buttonbox'>
                        <Link to={`/post/update/${id}`} className="button">수정</Link>
                        <button type="button" className="button" onClick={onDelete}>삭제</button>
                        <Link to='/board' className='button'>뒤로</Link>
                    </div>
                    :
                    <div className='buttonbox'>
                        <Link to='/board' className='button'>뒤로</Link>
                    </div>
                }
            </div>
            <div className='container'>
                <Comment postId={id} />
            </div>
        </div>
    );
};

export default PostPage;
