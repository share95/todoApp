const express = require("express");
const router = express.Router();
const { getTasks, createTask, getTask, updateTask, setTaskCompletedStatus, deleteTask } = require("../controllers/TasksController");
const validateToken = require("../middleware/validateTokenHandler");
// const allowOptionsRequests = require("../middleware/allowOptionsRequest");

// router.use(allowOptionsRequests);
router.use(validateToken);

router.get("/", getTasks);
router.post('/',createTask);
router.get('/:id',getTask);
router.put('/:id',updateTask),
router.patch('/:id',setTaskCompletedStatus);
router.delete('/:id',deleteTask);

module.exports = router;
