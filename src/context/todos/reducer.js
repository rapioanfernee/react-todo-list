import {
    FETCH_TODOS,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILED,
    DELETE_TODO,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILED,
    ADD_TODO,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILED,
} from "./constants"

export const initialState = {
    loading: false,
    error: null,
    todos: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS: {
            return {
                ...state,
                loading: true,
            };
        }
        case FETCH_TODOS_SUCCESS: {
            return {
                ...state,
                loading: false,
                todos: action.payload
            };
        }
        case FETCH_TODOS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case ADD_TODO: {
            return {
                ...state,
                loading: true,
            };
        }
        case ADD_TODO_SUCCESS: {
            return {
                ...state,
                loading: false,
                todos: [
                    ...state.todos,
                    action.payload,
                ]
            };
        }
        case ADD_TODO_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case DELETE_TODO: {
            return {
                ...state,
                loading: true,
            };
        }
        case DELETE_TODO_SUCCESS: {
            const filteredTodos = state.todos.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                loading: false,
                todos: filteredTodos
            };
        }
        case DELETE_TODO_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

