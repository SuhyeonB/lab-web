import React,{ useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../style/Main.css";
import "../../style/Board.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";
import { loadUser } from "../../redux/slices/authSlice";
//import api from '../../utils/axios';

const PostsSave = () => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser()).catch((error) => {
                console.log('Failed to load user, navigating to login.');
                navigate('/login');
            });
        }
    }, [dispatch, navigate, user]);

    const customUploadAdapter = (loader) => {
        return {
            upload(){
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then((file)=> {
                        data.append("name", file.name);
                        data.append("file", file);

                        axios.post('http://localhost:8080/api/images', data)
                        .then((res) => {
                            console.log(res.data.filename);
                            resolve({
                                default: `http://localhost:8080/images/${res.data.filename}`
                            });
                        })
                        .catch ((err) => reject(err))
                    })
                })
            }
        }
    }
    function uploadPlugin(editor){
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }

    const handleSubmit = (e) => {
        if (!category) alert("no category!");
        if (!title) alert(" no title!");
        if (! content) alert("no content!");
        e.preventDefault();

        const newPost = {
            category,
            title,
            writer: user?.name,
            content,
        };

        dispatch(createPost(newPost)).unwrap()
            .then(() => {
                navigate('/board');
            })
            .catch((err) => {
                console.error("Failed to save the post:", err);
            });
    };

    return(
        <div id="main" className="wrapper style1">
            <div className="container">
                <h2 className="title"> 게시글 등록 </h2>
                <hr/>

                <form className="row gtr-uniform gtr-50" onSubmit={handleSubmit}>
                    <div className="col-4 col-12-xsmall">
                        <label htmlFor="category">카테고리</label>
                        <select id="category" className="form-control" required onChange={(e) => setCategory(e.target.value)}>
                            <option value="etc">- Category -</option>
                            <option value="Backend">Backend</option>
                            <option value="Cloud">Cloud</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Unity">Unity</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="form-group col-12 col-12-large">
                        <label htmlFor="title">제목</label>
                        <input type="text" className="form-control" id="title" placeholder="제목을 입력하세요" required onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group col-12 col-12-large">
                        <label htmlFor="author"> 작성자 </label>
                        <input type="text" className="form-control" id="author" required value={user?.name || ''} placeholder={user?.name || ''} readOnly/>
                    </div>
                    <div className="form-group col-12 col-12-large">
                        <CKEditor 
                            editor={ClassicEditor}
                            config={{ 
                                placeholder: "내용을 입력하세요", 
                                extraPlugins: [uploadPlugin],
                            }}
                            onChange={(event, editor) => setContent(editor.getData())}
                        />
                    </div>
                    <div>
                        <button type="submit" className="button primary" id="btn-save">글 등록</button>
                        &nbsp;
                        <button type="button" className="button">
                            <Link to='/board'>취소</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostsSave;