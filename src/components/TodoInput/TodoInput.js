import React, { useState, useEffect } from 'react'
import useTodoContext from "../../context/todos/useTodoContext";

const TodoInput = ({
    addTodo,
    addTodoFailed,
    addTodoSuccess,
}) => {
    const [value, setValue] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo();
        fetch(`${API_URL}/todos`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                finished: false,
                dateCreated: "03-23-2021",
                todoDescription: "Test",
                todoName: value
            })
        }).then(res => res.json())
            .then(data => addTodoSuccess(data))
            .catch(err => {
                console.error(err);
                addTodoFailed(err)
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default TodoInput
