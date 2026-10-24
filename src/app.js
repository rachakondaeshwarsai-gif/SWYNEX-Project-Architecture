const express = require('express');
const tasksRouter = require('./routes/tasks');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'SWYNEX Student Task Management API is running.' });
});
app.get('/health', (req, res) => res.json({ success: true, status: 'healthy' }));
app.use('/api/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
