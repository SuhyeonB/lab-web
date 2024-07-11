import React, { useEffect, useState } from 'react';
import '../../style/Main.css';
import '../../style/Board.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postSlice';
import Pagination from './Pagination';

function BoardHome() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('all');
    const [query, setQuery] = useState('');
    const perPage = 10;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        if (!sessionStorage.getItem('access_token')) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    const none = 
        <tr>
            <td colSpan='5' style={{textAlign: 'center'}}>
            작성된 글이 없습니다.
            </td>
        </tr>;

    const filteredPosts = posts.filter(post => {
        if (condition === 'title') {
            return post.title.toLowerCase().includes(query.toLowerCase());
        } else if (condition === 'content') {
            return post.content.toLowerCase().includes(query.toLowerCase());
        } else if (condition === 'writer') {
            return post.writer.toLowerCase().includes(query.toLowerCase());
        } else {
            return true; // 'all' or no condition selected
        }
    });

    const tableBody = filteredPosts.length === 0 ? none : filteredPosts.slice((page - 1) * perPage, page * perPage).map((post, index) => (
        <tr className='align-center' key={post._id}>
            <td>{index + 1}</td>
            <td>{post.category}</td>
            <td style={{textAlign:"left"}}>
                <Link to={`/posts/${post._id}`}> {post.title} </Link>
            </td>
            <td>{post.writer}</td>
            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
        </tr>
    ));

    const onSearch = (e) => {
        e.preventDefault();
        setPage(1); // 검색할 때 페이지를 처음으로 리셋
    }

    return (
        <div id='main' className='wrapper'>
            <div id='content' className='container'>
                <h2> BOARD </h2>
                <hr/>

                <div className='row aln-middle aln-space'>
                    <div className='searchBox'>
                        <select id="category" required onChange={(e) => setCondition(e.target.value)}>
                            <option value="all">-----</option>
                            <option value="title"> title </option>
                            <option value="content"> content </option>
                            <option value="writer"> writer </option>
                        </select>
                        <input type="text" required onChange={(e) => setQuery(e.target.value)} />
                        <button className='search' onClick={e => onSearch(e)}>
                            <i className='fas fa-search fa-2x mag' />
                        </button>
                    </div>
                    {isLoggedIn && <Link to='../post/save' className='button'>글쓰기</Link>}
                </div>

                <table className='table-wrapper'>
                    <thead className='align-center'>
                    <tr>
                        <th style={{width: "5vw"}}>NO.</th>
                        <th style={{width: "10vw"}}>CATEGORY</th>
                        <th style={{width: "30vw"}}>TITLE</th>
                        <th style={{width: "10vw"}}>AUTHOR</th>
                        <th style={{width: "10vw"}}>DATE</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
                <Pagination
                    totalPosts={filteredPosts.length}
                    perPage={perPage}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}

export default BoardHome;
