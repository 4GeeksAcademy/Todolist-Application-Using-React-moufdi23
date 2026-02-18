import React, { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText.trim();
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
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
              {editingIndex === index ? (
                <input
                  type="text"
                  className="form-control"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => saveEdit(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(index);
                  }}
                />
              ) : (
                <span
                  onClick={() => startEditing(index)}
                  style={{ cursor: "pointer" }}
                >
                  {task}
                </span>
              )}

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
