import React, { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Todo List</h1>

      <input
        type="text"
        className="form-control"
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul className="list-group mt-3">
        {tasks.length === 0 ? (
          <li className="list-group-item text-center text-muted">
            No tasks, add a task
          </li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              onMouseEnter={(e) => {
                const x = e.currentTarget.querySelector(".delete-x");
                x.style.display = "inline";
              }}
              onMouseLeave={(e) => {
                const x = e.currentTarget.querySelector(".delete-x");
                x.style.display = "none";
              }}
            >
              {task}
              <span
                className="delete-x text-danger"
                style={{ cursor: "pointer", display: "none" }}
                onClick={() => deleteTask(index)}
              >
                ❌
              </span>
            </li>
          ))
        )}
      </ul>

      <p className="text-muted mt-3">
        {tasks.length} task{tasks.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default Home;
