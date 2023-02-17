import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import articles from './article-content';
import NotFound from './NotFound';
import axios from 'axios'
import CommentsList from '../components/CommentsList/CommentLists';
import AddCommentForm from '../components/CommentFrom/AddCommentForm';
import useUser from '../Hooks/useUser';


const Article = () => {
  const navigate = useNavigate();

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, { headers });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);
  // checking whethere article is existing or not

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {

    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(`/api/articles/${articleId}/upvotes`, null, { headers })
    const updateArticle = response.data;
    setArticleInfo(updateArticle);
  }

  if (!article) {
    return <NotFound />
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user
          ? <button onClick={addUpvote}>{canUpvote ? "Upvote" : "Already Upvoted"}</button>
          : <button onClick={() =>
            navigate('/login')
          }>Log in to upvote</button>}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
      {user
        ? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
        : <button onClick={() =>
          navigate('/login')
        }>Log in to add a comment</button>}
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}

export default Article