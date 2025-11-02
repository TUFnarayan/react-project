
import React from 'react';
import '../App.css';


const TaskInput = ({ input, setInput, addTask }) => (
  <input
    type="text"
    value={input}
    onChange={e => setInput(e.target.value)}
    onKeyDown={e => {
      if (e.key === 'Enter') addTask();
      if (e.key === 'Escape') setInput('');
    }}
    placeholder="Add a task and hit Enter"
    className="input"
  />
);

export default TaskInput;
