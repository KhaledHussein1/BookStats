import { useState, useEffect} from 'react'
import TextList from './TextList'
import TextForm from './TextForm'
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
    <>
      <TextList texts={texts} updateText={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New TEXT</button>
      { isModalOpen && <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <TextForm existingText={currentText} updateCallback={onUpdate}/>
          </div>
        </div>
        }
    </>
  );
}

export default App
