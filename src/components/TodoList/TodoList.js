import React from 'react'
import Todo from "../Todo"

const TodoList = ({
    error,
    todos,
    loading,
    todoProps,
}) => {
    console.log(todoProps)
    const renderTodos = () => {
        if (error) {
            return <div>{error}</div>
        }
        return todos.map((todo, index) => {
            return (
                <Todo todo={todo} key={`${todo.id}-${index}`} {...todoProps}></Todo>
            )
        })
    }


    return (
        <div>
            {loading ? <div>Loading...</div> : renderTodos()}
        </div>
    )
}

export default TodoList
