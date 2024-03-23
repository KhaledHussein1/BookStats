import {useState} from "react"
import { createText, updateText } from "../../api/textService";

const TextForm = ({ existingText = {}, updateCallback}) => {
    const [title, setTitle] = useState(existingText.title || "")
    const [text, setText] = useState(existingText.text || "")

    const updating = Object.entries(existingText).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            text
        };

        try {
            if (updating) {
                await updateText(existingText.id, data);
            } else {
                await createText(data);
            }
            updateCallback();
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input 
                type="text" 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="text">Text:</label>
            <input 
                type="text" 
                id="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
}

export default TextForm