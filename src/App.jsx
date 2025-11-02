
import React, { useState } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import useFilteredTasks from './hooks/useFilteredTasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = useFilteredTasks(tasks, filter);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    setInput('');
  };

  const toggleTask = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = id => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const taskCount = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="container">
      <h2 className="title">🧠 Narayan's Task Manager</h2>
      <TaskInput input={input} setInput={setInput} addTask={addTask} />
      <div>
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <TaskStats taskCount={taskCount} />
      <TaskFilters setFilter={setFilter} clearCompleted={clearCompleted} />
    </div>
  );
};

export default App;
