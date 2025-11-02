
import React from 'react';
import '../App.css';


const TaskFilters = ({ setFilter, clearCompleted }) => (
  <div>
    <button onClick={() => setFilter('all')} className="button">All</button>
    <button onClick={() => setFilter('active')} className="button">Active</button>
    <button onClick={() => setFilter('completed')} className="button">Completed</button>
    <button onClick={clearCompleted} className="button clear">Clear Completed</button>
  </div>
);

export default TaskFilters;
