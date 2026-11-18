const TaskModel = require('../models/taskModel');
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }
    const newTask = await TaskModel.create({ title, description, status, priority, due_date });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTasksByPriority = async (req, res) => {
  try {
    const tasks = await TaskModel.getByPriority();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const existingTask = await TaskModel.getById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await TaskModel.update(req.params.id, req.body);
    const updatedTask = await TaskModel.getById(req.params.id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const deleted = await TaskModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByPriority,
  updateTask,
  deleteTask,
};