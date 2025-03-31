import React, { useEffect, useState } from "react";

const Todo = ({
  todo,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailed,
  deleting,
  updating,
  updateTodo,
  updateTodoSuccess,
  updateTodoFailed,
}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [mode, setMode] = useState(null);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [status, setStatus] = useState(todo.status || "");
  const handleDelete = (id) => {
    deleteTodo(id);
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => deleteTodoSuccess(id))
      .catch((err) => {
        console.error(err);
        deleteTodoFailed(err);
      });
  };

  const handleEdit = (id) => {
    setMode(id);
  };

  const handleFormSubmit = (e, id, body) => {
    e?.preventDefault();
    updateTodo(id);

    fetch(`${API_URL}/tasks`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body:
        body ||
        JSON.stringify({
          status: status,
          description: description,
          title: title,
          id,
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateTodoSuccess(data);
        setMode(null);
      })
      .catch((err) => {
        console.error(err);
        updateTodoFailed(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Finished": {
        return "green";
      }
      case "Started": {
        return "black";
      }
      default: {
        return "grey";
      }
    }
  };

  const renderSelectField = (todoStatus, id) => {
    const statuses = [
      {
        id: "Ready",
        name: "Ready",
      },
      {
        id: "Started",
        name: "Started",
      },
      {
        id: "Finished",
        name: "Finished",
      },
    ];

    const handleChange = (event) => {
      setStatus(event.target.value);
      handleFormSubmit(
        null,
        id,
        JSON.stringify({
          status: event.target.value,
          description: description,
          title: title,
          id,
        })
      );
    };

    return (
      <select
        value={todo.status}
        style={{
          fontSize: "0.8rem",
          color: getStatusColor(todoStatus),
        }}
        onChange={(event) => handleChange(event, id)}
      >
        {statuses.map((status) => {
          return (
            <option
              key={status.id}
              value={status.id}
              style={{ color: getStatusColor(status.name) }}
            >
              {status.name}
            </option>
          );
        })}
      </select>
    );
  };

  const renderViewMode = () => (
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <div
        className="text-lg leading-6 font-medium text-gray-900"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{todo.title}</span>

        {renderSelectField(todo.status, todo.id)}
      </div>
      <div className="text-sm text-gray-500">{todo.description}</div>
    </div>
  );

  const renderEditMode = () => (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={(e) => handleFormSubmit(e, todo.id)}
      className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border text-lg leading-6 font-medium text-gray-900"
      ></input>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border text-sm text-gray-500"
      ></textarea>
      <span style={{ color: "black" }}>
        <button
          className="w-full inline-flex justify-center rounded-md border shadow-sm px-2 py-1 bg-white-600 text-base font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:ml-3 sm:w-auto sm:text-sm"
          type="submit"
          style={{ color: "black" }}
        >
          Submit
        </button>
        <button
          className="w-full inline-flex justify-center rounded-md border shadow-sm px-2 py-1 bg-white-600 text-base font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:ml-3 sm:w-auto sm:text-sm"
          type="cancel"
          onClick={() => setMode(null)}
          style={{ color: "black" }}
        >
          Cancel
        </button>
      </span>
    </form>
  );
  const isTodoDeleting = todo.id === deleting;
  const isTodoUpdating = todo.id === updating;
  return (
    <div
      style={{
        border: "1px solid grey",
        padding: 8,
        margin: 32,
        display: "flex",
        flexDirection: "column",
      }}
      key={`index-${todo.id}`}
    >
      {mode ? renderEditMode() : renderViewMode()}
      <div style={{ display: "flex", alignSelf: "flex-end" }}>
        {isTodoDeleting && "Deleting..."}
        {isTodoUpdating && "Updating..."}
        <div
          className="w-full inline-flex justify-center rounded-md border shadow-sm px-2 py-1 bg-white-600 text-base font-medium text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:ml-3 sm:w-auto sm:text-sm"
          style={{ cursor: "pointer", color: "black", fontSize: "0.65rem" }}
          onClick={() => handleEdit(todo.id)}
        >
          Edit
        </div>
        <div
          style={{ cursor: "pointer", fontSize: "0.65rem", width: 100 }}
          onClick={() => handleDelete(todo.id)}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default Todo;
