// App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';

function App() {
  return (
    <Router basename="/news_web_app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
