

const useFilteredTasks = (tasks, filter) => {
  return tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
};

export default useFilteredTasks;
