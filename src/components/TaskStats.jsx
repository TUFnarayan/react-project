
import React from 'react';
import '../App.css';


const TaskStats = ({ taskCount }) => (
  <div>
    <strong>Total:</strong> {taskCount.total} | <strong>Active:</strong> {taskCount.active} | <strong>Completed:</strong> {taskCount.completed}
  </div>
);

export default TaskStats;
