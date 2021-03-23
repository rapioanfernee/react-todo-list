import React from 'react'
import Todo from "../Todo"

const TodoList = ({
    error,
    todos,
    loading,
    todoProps,
    deleting,
    updating,
}) => {
    const renderTodos = () => {
        if (error) {
            return <div>{error}</div>
        }
        return todos.map((todo, index) => {
            return (
                <Todo
                    todo={todo}
                    key={`${todo.id}-${index}`}
                    deleting={deleting}
                    updating={updating}
                    {...todoProps}
                ></Todo>
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
