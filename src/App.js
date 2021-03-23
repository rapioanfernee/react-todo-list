import './App.css';
import { useEffect } from 'react'
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import useTodoContext from "./context/todos/useTodoContext";

function App() {
  const {
    fetchTodos,
    fetchTodosSuccess,
    fetchTodosFailed,
    addTodo,
    addTodoSuccess,
    addTodoFailed,
    deleteTodo,
    deleteTodoSuccess,
    deleteTodoFailed,
    state: todoState
  } = useTodoContext();
  const { loading, error, todos } = todoState;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchTodos();
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => fetchTodosSuccess(data))
      .catch(err => {
        console.error(err);
        fetchTodosFailed();
      });
  }, []);

  return (
    <div className="App">
      <TodoList
        todos={todos}
        error={error}
        loading={loading}
        todoProps={{
          deleteTodo,
          deleteTodoSuccess,
          deleteTodoFailed,
        }}
      />
      <TodoInput
        addTodo={addTodo}
        addTodoSuccess={addTodoSuccess}
        addTodoFailed={addTodoFailed}
      />
    </div>

  );
}

export default App;
