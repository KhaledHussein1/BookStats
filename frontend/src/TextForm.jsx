import {useState} from "react"

const TextForm = ({}) => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            title,
            text
        }
        const url = "http://127.0.0.1:5000/create_text"
        const options = {
            method: "POST",
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
            //successful
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
        <button type="submit">Create Text</button>
    </form>
}

export default TextForm