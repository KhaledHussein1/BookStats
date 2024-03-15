import { useState, useEffect} from 'react'
import TextList from './TextList'
import TextForm from './TextForm'
import './App.css'

function App() {
  const [texts, setTexts] = useState([{"title": "Frankenstein", "text": "once upon a time.", "id":1}])

  useEffect(() => {
    fetchTexts()
  }, [])

  const fetchTexts = async () => {
    const response = await fetch("http://127.0.0.1:5000/texts")
    const data = await response.json()
    setTexts(data.texts)
    console.log(data.texts)
  }

  return (
    <>
      <TextList texts={texts}/>
      <TextForm />
    </>
  );
}

export default App
