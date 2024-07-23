import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../style/Main.css";
import "../../style/Board.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/slices/postSlice"; // 가정: postSlice에 updatePost 액션이 정의되어 있음
import { loadUser } from "../../redux/slices/authSlice";

const PostUpdate = () => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    const { id } = useParams(); // URL에서 post id 파라미터를 가져옴
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser()).catch((error) => {
                console.log('Failed to load user, navigating to login.');
                navigate('/login');
            });
        } else {
            axios.get(`http://localhost:8080/api/posts/${id}`)
            .then((res) => {
                const { category, title, content } = res.data;
                setCategory(category);
                setTitle(title);
                setContent(content);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Failed to fetch post:', error);
                navigate('/board');
            });
        }
    }, [dispatch, navigate, user, id]);

    const handleSubmit = (e) => {
        if (!category || !title || !content) {
            alert("모든 필드를 입력해야 합니다!");
            e.preventDefault();
            return;
        }
        e.preventDefault();

        const updatedPost = {
            category,
            title,
            writer: user?.name,
            content,
        };

        dispatch(updatePost(id, updatedPost)).unwrap()
            .then(() => {
                navigate(`/board/${id}`);
            })
            .catch((err) => {
                console.error("Failed to update the post:", err);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="main" className="wrapper style1">
            <div className="container">
                <h2 className="title"> 게시글 수정 </h2>
                <hr/>

                <form className="row gtr-uniform gtr-50" onSubmit={handleSubmit}>
                    <div className="col-4 col-12-xsmall">
                        <label htmlFor="category">카테고리</label>
                        <select id="category" className="form-control" required value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Backend">Backend</option>
                            <option value="Cloud">Cloud</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Unity">Unity</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="form-group col-12 col-12-large">
                        <label htmlFor="title">제목</label>
                        <input type="text" className="form-control" id="title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-group col-12 col-12-large">
                        <CKEditor 
                            editor={ClassicEditor}
                            data={content}
                            config={{ 
                                placeholder: "내용을 입력하세요", 
                            }}
                            onChange={(event, editor) => setContent(editor.getData())}
                        />
                    </div>
                    <div>
                        <button type="submit" className="button primary" id="btn-save">수정 완료</button>
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

export default PostUpdate;