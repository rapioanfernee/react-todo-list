import React, { useState } from 'react'

const Todo = ({
    todo,
    deleteTodo,
    deleteTodoSuccess,
    deleteTodoFailed,
    updateTodo,
    updateTodoSuccess,
    updateTodoFailed,
}) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [mode, setMode] = useState(null);
    const [title, setTitle] = useState(todo.todoName);
    const [description, setDescription] = useState(todo.todoDescription);
    const handleDelete = (id) => {
        deleteTodo();
        fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
        }).then(res => res.json())
            .then(() => deleteTodoSuccess(id))
            .catch(err => {
                console.error(err)
                deleteTodoFailed(err)
            });
    }

    const handleEdit = (id) => {
        setMode(id);
    }

    const handleFormSubmit = (e, id) => {
        e.preventDefault();
        updateTodo()

        fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
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
                todoDescription: description,
                todoName: title
            })
        })
            .then(res => res.json())
            .then(data => {
                updateTodoSuccess(data);
                setMode(null)
            })
            .catch(err => {
                console.error(err);
                updateTodoFailed(err)
            });
    }

    const renderViewMode = () => (
        <>
            <div>{todo.todoName}</div>
            <div>{todo.todoDescription}</div>
            <div
                style={{ cursor: "pointer", color: 'blue', fontSize: '0.65rem' }}
                onClick={() => handleEdit(todo.id)}
            >
                Edit
            </div>
        </>
    );

    const renderEditMode = () => (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 250,
                margin: 'auto'
            }}
            onSubmit={(e) => handleFormSubmit(e, todo.id)}
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span>
                <button type="submit" >
                    submit
                </button>
                <button type="cancel" onClick={() => setMode(null)}>
                    cancel
                </button>
            </span>
        </form>
    )

    return (
        <div style={{ border: "1px solid grey", padding: 8, margin: 32 }} key={`index-${todo.id}`}>
            {mode ? renderEditMode() : renderViewMode()}

            <div
                style={{ cursor: "pointer", color: 'blue', fontSize: '0.65rem' }}
                onClick={() => handleDelete(todo.id)}
            >
                Remove
            </div>
        </div>
    )
}

export default Todo
