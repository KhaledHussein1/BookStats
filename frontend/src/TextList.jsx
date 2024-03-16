import React from "react"

const TextList = ({texts, updateText, updateCallback }) => {
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

    return <div>
        <h2>Texts</h2>
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