import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnalysisResults from "./components/pages/AnalysisResults";
import Home from './components/pages/Home';
import AppBar from './components/navbar/NavBar';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProfilePage from './components/pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis-results" element={<AnalysisResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
