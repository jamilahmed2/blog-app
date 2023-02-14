import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticleListPage from './pages/ArticleListPage';
import Navbar from './components/Navbar/Navbar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Navbar />
        <div id="page-body">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/articles' element={<ArticleListPage />} />
            <Route exact path='/articles/:articleId' element={<Article />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
