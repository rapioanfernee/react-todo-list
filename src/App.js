import "./App.css";
import { useEffect } from "react";
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
    updateTodo,
    updateTodoSuccess,
    updateTodoFailed,
    state: todoState,
  } = useTodoContext();
  const { loading, error, todos, deleting, adding, updating } = todoState;
  const API_URL =
    "https://2bf5mlx50k.execute-api.ap-southeast-1.amazonaws.com/dev";

  useEffect(() => {
    fetchTodos();
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => fetchTodosSuccess(data))
      .catch((err) => {
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
        deleting={deleting}
        updating={updating}
        todoProps={{
          deleteTodo,
          deleteTodoSuccess,
          deleteTodoFailed,
          updateTodo,
          updateTodoSuccess,
          updateTodoFailed,
        }}
      />
      <TodoInput
        addTodo={addTodo}
        addTodoSuccess={addTodoSuccess}
        addTodoFailed={addTodoFailed}
        adding={adding}
      />
    </div>
  );
}

export default App;
