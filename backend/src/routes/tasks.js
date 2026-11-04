const express = require('express');
const controller = require('../controllers/tasksController');

const router = express.Router();
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
