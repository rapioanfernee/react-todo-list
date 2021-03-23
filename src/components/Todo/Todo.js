import React, { useState } from 'react'

const Todo = ({
    todo,
    deleteTodo,
    deleteTodoSuccess,
    deleteTodoFailed,
    deleting,
    updating,
    updateTodo,
    updateTodoSuccess,
    updateTodoFailed,
}) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [mode, setMode] = useState(null);
    const [title, setTitle] = useState(todo.todoName);
    const [description, setDescription] = useState(todo.todoDescription);
    const handleDelete = (id) => {
        deleteTodo(id);
        fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
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
        updateTodo(id)

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
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="text-lg leading-6 font-medium text-gray-900">{todo.todoName}</div>
            <div className="text-sm text-gray-500">{todo.todoDescription}</div>

        </div>
    );

    const renderEditMode = () => (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
            onSubmit={(e) => handleFormSubmit(e, todo.id)}
            className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border text-lg leading-6 font-medium text-gray-900"
            ></input>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border text-sm text-gray-500"
            ></textarea>
            <span style={{ color: 'black' }}>
                <button
                    className="w-full inline-flex justify-center rounded-md border shadow-sm px-2 py-1 bg-white-600 text-base font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:ml-3 sm:w-auto sm:text-sm"
                    type="submit"
                    style={{ color: 'black' }}
                >
                    Submit
                </button>
                <button
                    className="w-full inline-flex justify-center rounded-md border shadow-sm px-2 py-1 bg-white-600 text-base font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:ml-3 sm:w-auto sm:text-sm"
                    type="cancel"
                    onClick={() => setMode(null)}
                    style={{ color: 'black' }}
                >
                    Cancel
                </button>
            </span>
        </form>
    )
    const isTodoDeleting = todo.id === deleting;
    const isTodoUpdating = todo.id === updating;
    return (
        <div style={{ border: "1px solid grey", padding: 8, margin: 32, display: 'flex', flexDirection: "column" }} key={`index-${todo.id}`}>
            {mode ? renderEditMode() : renderViewMode()}
            <div style={{ display: 'flex', alignSelf: "flex-end" }}>
                {isTodoDeleting && 'Deleting...'}
                {isTodoUpdating && 'Updating...'}
                <div
                    className="w-full inline-flex justify-center rounded-md border shadow-sm px-2 py-1 bg-white-600 text-base font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:ml-3 sm:w-auto sm:text-sm"
                    style={{ cursor: "pointer", color: 'black', fontSize: '0.65rem' }}
                    onClick={() => handleEdit(todo.id)}
                >
                    Edit
                </div>
                <div
                    style={{ cursor: "pointer", fontSize: '0.65rem', width: 100, }}
                    onClick={() => handleDelete(todo.id)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Remove
                </div>
            </div>
        </div>
    )
}

export default Todo
