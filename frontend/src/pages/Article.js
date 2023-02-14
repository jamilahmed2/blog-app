import React from 'react'
import { useParams } from 'react-router-dom'
import articles from './article-content';
import NotFound from './NotFound';

const Article = () => {
// http://localhost/3000/learn-react = articleId, useParams
// http://localhost/3000/learn-node = articleId, useParams
// http://localhost/3000/mongodb = articleId, useParams

  // 1st Method
  // const params = useParams();
  // const { articleId } = params.articleId

  // 2nd Method
  const { articleId } = useParams();

  // checking whethere article is existing or not
  const article = articles.find((article) => article.name === articleId)

  if(!article){
    return <NotFound/>
  }
  return (
    <>
      {/* <div>This is a article with an id {articleId}</div> */}
      <h1>{article.title}</h1>
      {article.content.map(paragraph => (
        <div >
          <p key={paragraph}>{paragraph}</p>
        </div>
      ))}
    </>
  )
}

export default Article