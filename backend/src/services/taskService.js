import prisma from '../lib/prisma.js';
import { AppError } from '../utils/AppError.js';

export const createTask = async (userId, taskData) => {
  const task = await prisma.task.create({
    data: {
      ...taskData,
      userId,
    },
  });

  return task;
};

export const getTasks = async (userId, page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  // build where clause with userId, status/priority filters, and optional search
  const where = {
    userId,
    ...(filters.status && { status: filters.status }),
    ...(filters.priority && { priority: filters.priority }),
    ...(filters.search && {
      title: { contains: filters.search, mode: 'insensitive' },
    }),
  };

  // fetch tasks and total count in parallel for performance
  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: +limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      page: +page,
      limit: +limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (taskId, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  return task;
};

export const updateTask = async (taskId, userId, updateData) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });

  return updatedTask;
};

export const deleteTask = async (taskId, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  await prisma.task.delete({
    where: { id: taskId },
  });
};

export const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
