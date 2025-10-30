export const calculateCompletion = (completed, total) => total > 0 ? (completed / total) * 100 : 0;
export const isHighPriority = (task) => task.priority === 'High';
export function filterTasks(tasks, status) {
  const filtered = [];
  for (let task of tasks) {
    if (status === 'completed' && task.completed) filtered.push(task);
    else if (status === 'pending' && !task.completed) filtered.push(task);
  }
  return filtered;
}
export const saveTask = (task) => new Promise((resolve) => {
  setTimeout(() => {
    console.log('Saved task:', task);
    resolve({ success: true });
  }, 1000);
});
