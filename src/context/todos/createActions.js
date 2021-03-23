import {
    FETCH_TODOS,
    FETCH_TODOS_FAILED,
    FETCH_TODOS_SUCCESS,
    DELETE_TODO,
    DELETE_TODO_FAILED,
    DELETE_TODO_SUCCESS,
    ADD_TODO,
    ADD_TODO_FAILED,
    ADD_TODO_SUCCESS,
    UPDATE_TODO,
    UPDATE_TODO_FAILED,
    UPDATE_TODO_SUCCESS,
} from "./constants"

const createActions = (dispatch) => {
    return {
        fetchTodos: () => dispatch({ type: FETCH_TODOS }),
        fetchTodosSuccess: (data) => dispatch({ type: FETCH_TODOS_SUCCESS, payload: data }),
        fetchTodosFailed: (err) => dispatch({ type: FETCH_TODOS_FAILED, payload: err }),
        addTodo: (id) => dispatch({ type: ADD_TODO, payload: id }),
        addTodoSuccess: (data) => dispatch({ type: ADD_TODO_SUCCESS, payload: data }),
        addTodoFailed: (err) => dispatch({ type: ADD_TODO_FAILED, payload: err }),
        deleteTodo: (id) => dispatch({ type: DELETE_TODO, payload: id }),
        deleteTodoSuccess: (id) => dispatch({ type: DELETE_TODO_SUCCESS, payload: id }),
        deleteTodoFailed: (err) => dispatch({ type: DELETE_TODO_FAILED, payload: err }),
        updateTodo: (id) => dispatch({ type: UPDATE_TODO, payload: id }),
        updateTodoSuccess: (data) => dispatch({ type: UPDATE_TODO_SUCCESS, payload: data }),
        updateTodoFailed: (err) => dispatch({ type: UPDATE_TODO_FAILED, payload: err })
    }
}

export default createActions;