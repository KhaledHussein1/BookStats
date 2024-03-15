import React from "react"

const TextList = ({texts}) => {
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
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default TextList