import React from "react"
import { useNavigate } from 'react-router-dom';

const TextList = ({texts, updateText, updateCallback }) => {
    const navigate = useNavigate();

    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_text/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete.")
            }
        } catch (error) {
            alert(error)
        }
    } 

    const onAnalyze = async (id) => {
        try {
            const options = {
                method: "POST"
            }
            const response = await fetch(`http://127.0.0.1:5000/analysis/${id}`, options)
            const data = await response.json();

            console.log("Analysis response !!!!!:", data);

            if (response.status === 200) {
                console.log("Analysis successful:", data);
                navigate('/analysis-results', { state: 
                                                { wordCount: data.word_count,
                                                frequentWords: data.most_frequent_words,
                                                sentenceDistribution: data.sentence_length_distribution,
                                                sentimentComposition: data.sentiment_analysis } });
                //updateCallback()
            } else {
                console.error("Failed to analyze.")
            }
        } catch (error) {
            alert(error)
        }
    } 

    return <div>
        <h2>LexiLytics</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {texts.map((text) => (
                    <tr key={text.id}>
                        <td>{text.title}</td>
                        <td>{text.text}</td>
                        <td>
                            <button onClick={() => onAnalyze(text.id)}>Analyze</button>
                            <button onClick={() => updateText(text)}>Update</button>
                            <button onClick={() => onDelete(text.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default TextList