import React, { useState } from 'react'
import axios from 'axios'

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('')
    const [commentText, setCommentText] = useState('')

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle)
        setName('');
        setCommentText('');
    }
    return (
        <div id='add-comment-form'>
            <label >
                Name: <input value={name} onChange={e => setName(e.target.value)} type="text" />
            </label>
            <label >
                Comment: <textarea value={commentText} onChange={e => setCommentText(e.target.value)} cols="50" rows="4"></textarea>
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm