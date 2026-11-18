const { pool } = require('../config/db');
const TaskModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },
  getByPriority: async () => {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY FIELD(priority, 'high', 'medium', 'low'), due_date ASC"
    );
    return rows;
  },
  create: async ({ title, description, status, priority, due_date }) => {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', status || 'pending', priority || 'medium', due_date || null]
    );
    return { id: result.insertId, title, description, status, priority, due_date };
  },
  update: async (id, { title, description, status, priority, due_date }) => {
    const [result] = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           status = COALESCE(?, status),
           priority = COALESCE(?, priority),
           due_date = COALESCE(?, due_date)
       WHERE id = ?`,
      [title, description, status, priority, due_date, id]
    );
    return result.affectedRows;
  },
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows;
  },
};
module.exports = TaskModel;