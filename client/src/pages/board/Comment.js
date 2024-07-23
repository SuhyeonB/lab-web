import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, createComment, updateComment, deleteComment } from '../../redux/slices/commentSlice';

const Comment = ({ postId }) => {
    const [newComment, setNewComment] = useState('');
    const [reply, setReply] = useState({ parentCommentId: null, comment: '' });
    const [editableComment, setEditableComment] = useState(false);
    const [updatedComment, setUpdatedComment] = useState('');
    const user = useSelector(state => state.auth.user);
    const comments = useSelector(state => state.comments.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment) return;

        const commentData = {
            writer: user?.name,
            comment: newComment,
            postId: postId
        };

        dispatch(createComment(commentData));
        setNewComment('');
    };

    const handleReplySubmit = (e, parentCommentId) => {
        e.preventDefault();
        if (!reply.comment) return;

        const commentData = {
            writer: user.name,
            comment: reply.comment,
            postId: postId,
            parentComment: parentCommentId
        };

        dispatch(createComment(commentData));
        setReply({ parentCommentId: null, comment: '' });
    };

    const handleUpdate = (e, commentId) => {
        e.preventDefault();

        const commentData = {
            comment: updatedComment
        };

        dispatch(updateComment({ commentId, commentData }));
        setEditableComment(true);
        setUpdatedComment('');
    };

    const handleDelete = (commentId) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            dispatch(deleteComment(commentId));
        }
    };

    const renderComments = (parentId = null) => {
        return comments
            .filter(comment => (comment.parentComment ? comment.parentComment._id : null) === parentId)
            .map(comment => (
                <div key={comment._id} className={`comment ${parentId ? 'child-comment' : 'parent-comment'}`}>
                    <div className="comment-header">
                        <span><strong>{comment.writer}</strong></span>
                        <span>{comment.createdAt.substr(0, 10)} {comment.createdAt.substr(11, 8)}</span>
                    </div>
                    {editableComment === comment._id ? (
                        <form onSubmit={(e) => handleUpdate(e, comment._id)}>
                            <input
                                type="text"
                                value={updatedComment}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                placeholder="Edit your comment"
                            />
                            <button type="submit">✔</button>
                            <button type="button" onClick={() => setEditableComment(null)}>✖</button>
                        </form>
                    ) : (
                        <>
                            <p>{comment.comment}</p>
                            <button onClick={() => setReply({ parentCommentId: comment._id, comment: '' })}>Reply</button>
                            {user && user.name === comment.writer && (
                                <>
                                    <button onClick={() => {
                                        setEditableComment(comment._id);
                                        setUpdatedComment(comment.comment);
                                    }}>🖍</button>
                                    <button onClick={() => handleDelete(comment._id)}>🗑</button>
                                </>
                            )}
                            {reply.parentCommentId === comment._id && (
                                <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                                    <input
                                        type="text"
                                        value={reply.comment}
                                        onChange={(e) => setReply({ ...reply, comment: e.target.value })}
                                        placeholder="Write a reply..."
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                            )}
                        </>
                    )}
                    {renderComments(comment._id)}
                </div>
            ));
    };

    return (
        <div>
            <h3>Comments</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button type="submit">Submit</button>
            </form>
            {comments? renderComments() : <></>}
        </div>
    );
};

export default Comment;