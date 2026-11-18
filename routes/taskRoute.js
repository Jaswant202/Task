const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByPriority,
  updateTask,
  deleteTask,
} = require('../controllers/taskControllers');
router.post('/createTask', createTask);
router.get('/getAllTasks', getAllTasks);
router.get('/getTaskById/:id', getTaskById);
router.get('/getTasksByPriority', getTasksByPriority);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);
module.exports = router;