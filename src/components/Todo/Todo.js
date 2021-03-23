import React from 'react'

const Todo = ({ todo }) => {
    return (
        <div style={{ border: "1px solid grey", padding: 8, margin: 8 }} key={`index-${todo.id}`}>
            <div>{todo.todoName}</div>
            <div>{todo.todoDescription}</div>
            <div>{todo.finished}</div>
        </div>
    )
}

export default Todo
