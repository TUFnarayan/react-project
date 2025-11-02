import React from 'react';
import '../App.css';

const TaskItem = ({ task, toggleTask, deleteTask }) => (
  <div className={`task ${task.completed ? 'completed' : ''}`}>
    <label className="task-label">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span>{task.text}</span>
    </label>
    <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
  </div>
);

export default TaskItem;