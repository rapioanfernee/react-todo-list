import React, { useReducer } from 'react';
import createActions from "./createActions";
import TodoContext from "./TodoContext";
import { reducer, initialState } from "./reducer"


const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const actions = createActions(dispatch);

    return (
        <TodoContext.Provider value={{ state, ...actions }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider;