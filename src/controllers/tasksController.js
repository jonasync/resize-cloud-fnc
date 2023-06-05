const taskService = require('../services/tasksService');

const getTaskById = (req, res) => {
    const task = taskService.getTaskById();
    res.send(`get task info ${req}`);
}

const postTask = (req, res) => {
    const postedTask = taskService.postTask();
    res.send('post image task');
}


module.exports = {
    getTaskById,
    postTask
};