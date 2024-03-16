import {useState} from "react"

const TextForm = ({ existingText = {}, updateCallback}) => {
    const [title, setTitle] = useState(existingText.title || "")
    const [text, setText] = useState(existingText.text || "")

    const updating = Object.entries(existingText).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            title,
            text
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_text/${existingText.id}`:"create_text")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status != 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

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