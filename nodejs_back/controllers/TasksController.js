const asyncHandler = require("express-async-handler");
const TaskModel = require("../models/TaskModel");

//@desc Get all tasks
//@route GET /api/tasks
//@access private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.find({ user_id: req.user.id });
  res.status(200).json(tasks);
});

//@desc Get task details
//@route GET /api/tasks/:id
//@access private
const getTask = asyncHandler(async (req, res) => {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    if (task.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("This task belongs to a different user");
    }
    res.status(200).json(task);
});

//@desc Create a task
//@route POST /api/tasks/
//@access private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, due } = req.body;
  const task = await TaskModel.create({
    user_id: req.user.id,
    title,
    description,
    due,
  });
  res.status(201).json(task);
});

//@desc Update a task
//@route PUT /api/tasks/:id
//@access private
const updateTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("This task belongs to a different user");
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTask);
});

//@desc Update a task
//@route PATCH /api/tasks/:id
//@access private
const setTaskCompletedStatus = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("This task belongs to a different user");
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.status(200).json(updatedTask);
});

//@desc Delete a task
//@route DELETE /api/tasks/:id
//@access private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("This task belongs to a different user");
  }

  await TaskModel.deleteOne({_id : req.params.id});
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  setTaskCompletedStatus,
  deleteTask,
};
