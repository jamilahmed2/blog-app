import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Article from './pages/Article';
import ArticleList from './pages/ArticleList';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="page-body">
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/articles' element={<ArticleList />} />
            <Route exact path='/articles/:articleId' element={<Article />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
