const pool = require('../config/db');

const allowedStatuses = ['pending', 'in_progress', 'completed'];
const allowedPriorities = ['low', 'medium', 'high'];

function validateTask(body, partial = false) {
  const errors = [];
  const has = (key) => Object.prototype.hasOwnProperty.call(body, key);

  if (!partial || has('title')) {
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      errors.push('title is required and must be a non-empty string.');
    } else if (body.title.trim().length > 120) {
      errors.push('title must be 120 characters or fewer.');
    }
  }

  if (has('description') && body.description !== null && typeof body.description !== 'string') {
    errors.push('description must be a string or null.');
  }

  if (has('status') && !allowedStatuses.includes(body.status)) {
    errors.push(`status must be one of: ${allowedStatuses.join(', ')}.`);
  }

  if (has('priority') && !allowedPriorities.includes(body.priority)) {
    errors.push(`priority must be one of: ${allowedPriorities.join(', ')}.`);
  }

  if (has('due_date') && body.due_date !== null && body.due_date !== '') {
    if (typeof body.due_date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.due_date)) {
      errors.push('due_date must use YYYY-MM-DD format or be null.');
    } else {
      const date = new Date(`${body.due_date}T00:00:00Z`);
      if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== body.due_date) {
        errors.push('due_date must be a valid calendar date.');
      }
    }
  }

  if (partial && !['title', 'description', 'due_date', 'status', 'priority'].some(has)) {
    errors.push('Provide at least one field to update.');
  }

  return errors;
}

function normalizedValues(body) {
  return {
    title: typeof body.title === 'string' ? body.title.trim() : body.title,
    description: body.description === '' ? null : body.description,
    due_date: body.due_date === '' ? null : body.due_date,
    status: body.status,
    priority: body.priority
  };
}

async function getAllTasks(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, description, due_date, status, priority, created_at, updated_at FROM tasks ORDER BY created_at DESC'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) { next(err); }
}

async function getTaskById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({ success: false, message: 'Task id must be a positive integer.' });
    }
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

async function createTask(req, res, next) {
  const errors = validateTask(req.body);
  if (errors.length) return res.status(400).json({ success: false, errors });

  try {
    const task = normalizedValues(req.body);
    const [result] = await pool.execute(
      `INSERT INTO tasks (title, description, due_date, status, priority)
       VALUES (?, ?, ?, ?, ?)`,
      [task.title, task.description ?? null, task.due_date ?? null, task.status || 'pending', task.priority || 'medium']
    );
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Task created successfully.', data: rows[0] });
  } catch (err) { next(err); }
}

async function updateTask(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: 'Task id must be a positive integer.' });
  }
  const errors = validateTask(req.body, true);
  if (errors.length) return res.status(400).json({ success: false, errors });

  try {
    const [existing] = await pool.execute('SELECT id FROM tasks WHERE id = ?', [id]);
    if (!existing.length) return res.status(404).json({ success: false, message: 'Task not found.' });

    const fields = [];
    const values = [];
    const body = normalizedValues(req.body);
    for (const key of ['title', 'description', 'due_date', 'status', 'priority']) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        fields.push(`${key} = ?`);
        values.push(body[key] ?? null);
      }
    }
    values.push(id);
    await pool.execute(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, values);
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json({ success: true, message: 'Task updated successfully.', data: rows[0] });
  } catch (err) { next(err); }
}

async function deleteTask(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: 'Task id must be a positive integer.' });
  }
  try {
    const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.status(200).json({ success: true, message: 'Task deleted successfully.' });
  } catch (err) { next(err); }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
