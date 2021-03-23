import React from 'react'
import Todo from "../Todo"
import useTodoContext from "../../context/todos/useTodoContext";

const TodoList = ({
    error,
    todos,
    loading,
}) => {
    const renderTodos = () => {
        if (error) {
            return <div>{error}</div>
        }
        return todos.map((todo, index) => {
            return (
                <Todo todo={todo} key={`${todo.id}-${index}`}></Todo>
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
