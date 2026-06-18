import React, { useState } from 'react';

const INITIAL_DATA = [
  { id: 1, title: 'DBMS Assignment 1', subject: 'DBMS', status: 'Pending' },
  { id: 2, title: 'React Hooks Lab', subject: 'Web Dev', status: 'Submitted' },
  { id: 3, title: 'AI Research Paper', subject: 'AI', status: 'Late' }
];

export default function AssignmentTracker() {
  const [tasks, setTasks] = useState(INITIAL_DATA);
  const [filter, setFilter] = useState('All');
  
  // Form input states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('DBMS');

  // Core Dashboard Calculations
  const submittedCount = tasks.filter(t => t.status === 'Submitted').length;
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const lateCount = tasks.filter(t => t.status === 'Late').length;

  // Add Assignment Form Handler
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a title');
    
    const newTask = { id: Date.now(), title, subject, status: 'Pending' };
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  // Status Change Inline Dropdown Logic
  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  // Dynamic Array Filter
  const filteredTasks = tasks.filter(t => filter === 'All' || t.subject === filter);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '650px', margin: '0 auto' }}>
      <h2>📊 Assignment Status Tracker</h2>

      {/* Summary Counters Widget */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: '#e6f4ea', padding: '10px 20px', borderRadius: '5px', flex: 1, textAlign: 'center' }}>
          <b>Submitted:</b> {submittedCount}
        </div>
        <div style={{ background: '#fef7e0', padding: '10px 20px', borderRadius: '5px', flex: 1, textAlign: 'center' }}>
          <b>Pending:</b> {pendingCount}
        </div>
        <div style={{ background: '#fce8e6', padding: '10px 20px', borderRadius: '5px', flex: 1, textAlign: 'center' }}>
          <b>Late:</b> {lateCount}
        </div>
      </div>

      {/* Simplified Add Task Form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '25px', background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <input 
          type="text" placeholder="Assignment Title..." value={title} 
          onChange={e => setTitle(e.target.value)} style={{ flex: 2, padding: '8px' }} 
        />
        <select value={subject} onChange={e => setSubject(e.target.value)} style={{ flex: 1, padding: '8px' }}>
          <option value="DBMS">DBMS</option>
          <option value="Web Dev">Web Dev</option>
          <option value="AI">AI</option>
        </select>
        <button type="submit" style={{ padding: '8px 15px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Add</button>
      </form>

      {/* Filter Selector Row */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>📋 Task Roster</h3>
        <div>
          <label>Filter Subject: </label>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '5px' }}>
            <option value="All">All Subjects</option>
            <option value="DBMS">DBMS</option>
            <option value="Web Dev">Web Dev</option>
            <option value="AI">AI</option>
          </select>
        </div>
      </div>

      {/* Main Render List Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.map(task => (
          <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div>
              <b style={{ fontSize: '16px' }}>{task.title}</b>
              <span style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', marginLeft: '10px', borderRadius: '3px' }}>{task.subject}</span>
            </div>
            <select 
              value={task.status} 
              onChange={e => updateStatus(task.id, e.target.value)}
              style={{ padding: '6px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Submitted">✅ Submitted</option>
              <option value="Late">🚨 Late</option>
            </select>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>No assignments found for this subject.</div>
        )}
      </div>
    </div>
  );
}