import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';
import * as taskService from '../services/taskService.js';

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  const userId = req.user.userId;

  const task = await taskService.createTask(userId, {
    title,
    description,
    priority: priority || 'MEDIUM',
    status: status || 'PENDING',
    dueDate: dueDate ? new Date(dueDate) : null,
  });

  sendResponse(res, 201, true, 'Task created successfully', task);
});

export const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filters = {};
  if (req.query.status) filters.status = req.query.status;
  if (req.query.priority) filters.priority = req.query.priority;

  const result = await taskService.getTasks(userId, page, limit, filters);

  sendResponse(res, 200, true, 'Tasks retrieved successfully', result.tasks, result.pagination);
});

export const getTaskById = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  const task = await taskService.getTaskById(id, userId);

  sendResponse(res, 200, true, 'Task retrieved successfully', task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, description, priority, status, dueDate } = req.body;

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (priority !== undefined) updateData.priority = priority;
  if (status !== undefined) updateData.status = status;
  if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

  const task = await taskService.updateTask(id, userId, updateData);

  sendResponse(res, 200, true, 'Task updated successfully', task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  await taskService.deleteTask(id, userId);

  sendResponse(res, 204, true, 'Task deleted successfully');
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await taskService.getAllUsers(page, limit);

  sendResponse(res, 200, true, 'Users retrieved successfully', result.users, result.pagination);
});
