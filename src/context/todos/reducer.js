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
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILED,
} from "./constants";

export const initialState = {
  loading: false,
  adding: false,
  updating: null,
  deleting: null,
  error: null,
  todos: [],
};

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
        todos: action.payload,
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
        adding: true,
      };
    }
    case ADD_TODO_SUCCESS: {
      return {
        ...state,
        adding: false,
        todos: [...state.todos, action.payload],
      };
    }
    case ADD_TODO_FAILED: {
      return {
        ...state,
        adding: false,
        error: action.payload,
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        deleting: action.payload,
      };
    }
    case DELETE_TODO_SUCCESS: {
      console.log(action);
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        deleting: null,
        todos: filteredTodos,
      };
    }
    case DELETE_TODO_FAILED: {
      return {
        ...state,
        deleting: null,
        error: action.payload,
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        updating: action.payload,
      };
    }
    case UPDATE_TODO_SUCCESS: {
      const updatedTodos = state.todos.map((todo) => {
        if (action.payload.id === todo.id) {
          return {
            ...action.payload,
          };
        }
        return todo;
      });
      return {
        ...state,
        updating: null,
        todos: updatedTodos,
      };
    }
    case UPDATE_TODO_FAILED: {
      return {
        ...state,
        updating: null,
      };
    }
    default: {
      return state;
    }
  }
};
