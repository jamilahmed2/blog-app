import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import articles from './article-content';
import NotFound from './NotFound';
import axios from 'axios'
import CommentsList from '../components/CommentsList/CommentLists';
import AddCommentForm from '../components/CommentFrom/AddCommentForm';
import useUser from '../Hooks/useUser';

const Article = () => {
  const { user, isLoading } = useUser();
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId)

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}/`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }
    loadArticleInfo();
  }, []);
  // checking whethere article is existing or not

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvotes`)
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
          ? <button onClick={addUpvote}>Upvote</button>
          : <button>Log in to upvote</button>}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map(paragraph => (
        <div >
          <p key={paragraph}>{paragraph}</p>
        </div>
      ))}
      {user
        ? <AddCommentForm articleName={articleId} onArticleUpdated={updateArticle => setArticleInfo(updateArticle)} />
        : <button>Log in to add a comment</button>}
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}

export default Article