import React, { useState, useEffect } from 'react'
import useTodoContext from "../../context/todos/useTodoContext";

const TodoInput = ({
    addTodo,
    addTodoFailed,
    addTodoSuccess,
}) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
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
                todoDescription: description,
                todoName: value
            })
        }).then(res => res.json())
            .then(data => {
                addTodoSuccess(data);
                setValue('');
                setDescription('');
            })
            .catch(err => {
                console.error(err);
                addTodoFailed(err)
            });
    }
    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: 150,
                maxWidth: 350,
                margin: 'auto'
            }}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Todo Title"
            />
            <textarea
                rows="5"
                value={description}
                placeholder="Todo Description"
                onChange={e => setDescription(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default TodoInput
