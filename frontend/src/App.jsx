import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnalysisResults from "./components/pages/AnalysisResults";
import Home from './components/pages/Home';
import './App.css'

function App() {
  const [texts, setTexts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentText, setCurrentText] = useState({})

  useEffect(() => {
    fetchTexts()
  }, [])

  const fetchTexts = async () => {
    const response = await fetch("http://127.0.0.1:5000/texts")
    const data = await response.json()
    setTexts(data.texts)
    console.log(data.texts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentText({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (text) => {
    if (isModalOpen) return
    setCurrentText(text)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchTexts()
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home texts={texts} openEditModal={openEditModal} openCreateModal={openCreateModal} isModalOpen={isModalOpen} currentText={currentText} onUpdate={onUpdate} />}
        />
        <Route path="/analysis-results" element={<AnalysisResults />} />
      </Routes>
    </Router>
  );
}

export default App
