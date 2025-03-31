import React, { useState } from "react";

const TodoInput = ({ addTodo, addTodoFailed, addTodoSuccess, adding }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        status: "Ready",
        dateCreated: "03-23-2021",
        description: description,
        title: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        addTodoSuccess(data);
        setValue("");
        setDescription("");
      })
      .catch((err) => {
        console.error(err);
        addTodoFailed(err);
      });
  };
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        minHeight: 215,
        maxHeight: 500,
        maxWidth: 350,
        margin: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Todo Title"
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      <textarea
        rows="3"
        value={description}
        placeholder="Todo Description"
        onChange={(e) => setDescription(e.target.value)}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
      >
        Submit
      </button>
      {adding && "Adding To-do..."}
    </form>
  );
};

export default TodoInput;
