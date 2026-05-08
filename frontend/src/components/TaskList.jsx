import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div style={styles.empty}>
        <p>No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return '#dc3545';
      case 'MEDIUM':
        return '#ffc107';
      case 'LOW':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return '#28a745';
      case 'IN_PROGRESS':
        return '#007bff';
      case 'PENDING':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  return (
    <div style={styles.container}>
      {tasks.map((task) => (
        <div key={task.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <h3>{task.title}</h3>
            <div style={styles.badges}>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: getPriorityColor(task.priority),
                }}
              >
                {task.priority}
              </span>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: getStatusColor(task.status),
                }}
              >
                {task.status}
              </span>
            </div>
          </div>

          {task.description && (
            <p style={styles.description}>{task.description}</p>
          )}

          {task.dueDate && (
            <p style={styles.dueDate}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          <div style={styles.actions}>
            <button
              onClick={() => onEdit(task)}
              style={styles.editBtn}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
    gap: '10px',
  },
  badges: {
    display: 'flex',
    gap: '5px',
  },
  badge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px',
    lineHeight: '1.4',
  },
  dueDate: {
    color: '#999',
    fontSize: '12px',
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  deleteBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#999',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
};

export default TaskList;
