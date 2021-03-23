import { useContext } from 'react';
import TodoContext from "./TodoContext"

const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('Missing Context');
    }
    return context;
}

export default useTodoContext