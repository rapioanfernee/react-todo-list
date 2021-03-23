import React from 'react'

const Todo = ({
    todo,
    deleteTodo,
    deleteTodoSuccess,
    deleteTodoFailed,
}) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const handleDelete = (id) => {
        deleteTodo();
        fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(() => deleteTodoSuccess(id))
            .catch(err => {
                console.error(err)
                deleteTodoFailed(err)
            })
    }
    return (
        <div style={{ border: "1px solid grey", padding: 8, margin: 8 }} key={`index-${todo.id}`}>
            <div>{todo.todoName}</div>
            <div>{todo.todoDescription}</div>
            <div>{todo.finished}</div>
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
