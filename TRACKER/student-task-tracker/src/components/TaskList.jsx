import { useState } from 'react';
import { saveTask } from '../utils/taskUtils';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = { id: Date.now(), title: input, completed: false };
    setTasks([...tasks, newTask]);
    saveTask(newTask); // async save
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h1>Student Task Tracker</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li
            key={t.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textDecoration: t.completed ? 'line-through' : 'none',
              margin: '5px 0'
            }}
          >
            <span onClick={() => toggleTask(t.id)} style={{ cursor: 'pointer' }}>
              {t.title}
            </span>
            <button
              onClick={() => removeTask(t.id)}
              style={{
                marginLeft: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                padding: '3px 6px'
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
