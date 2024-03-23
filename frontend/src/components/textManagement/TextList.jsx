import React from "react"
import { useNavigate } from 'react-router-dom';
import { deleteText, analyzeText } from "../../api/textService";

const TextList = ({texts, updateText, updateCallback }) => {
    const navigate = useNavigate();

    const onDelete = async (id) => {
        try {
            await deleteText(id);
            updateCallback();
        } catch (error) {
            console.error("Error deleting text:", error);
        }
    };

    const onAnalyze = async (id) => {
        try {
            const analysisData = await analyzeText(id);
            console.log("Analysis data:", analysisData);
            navigate('/analysis-results', { state: analysisData });
        } catch (error) {
            console.error("Error analyzing text:", error);
        }
    };

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