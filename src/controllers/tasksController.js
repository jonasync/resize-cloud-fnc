const taskService = require('../services/tasksService');

const getTaskById = async (req, res) => {
    const {taskId} = req.params
    const task = await taskService.getTaskById(taskId);
    res.status(201).send({status: 200, data: task});
}

const postTask = async (req, res) => {
    const {body} = req;
    // if(!body.file) return;
    const task = {
        ...body
    }
    const postedTask = await taskService.postTask(task);
    res.status(201).send({status: 200, data: postedTask});
}

module.exports = {
    getTaskById,
    postTask
};