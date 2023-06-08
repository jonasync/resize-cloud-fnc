const taskService = require('../services/tasksService');

const getTaskById = async (req, res) => {
    try {
        const {taskId} = req.params
        const task = await taskService.getTaskById(taskId);
        res.status(201).send({status: 200, data: task});
    } catch (error) {
        res.status(error.status || 500).send({status: "FAILED", data: {error: error.message || error}})
    }
}

const createTask = async (req, res) => {
    const {file} = req.files || {};
    
    if(!file) return res.status(400).send({status: 'FAILED', data: { error: "The File is empty"}});
    if(file instanceof Array) return res.status(400).send({status: 'FAILED', data: { error: "You must to select one image"}});
    if(!file.mimetype.startsWith('image')) return res.status(400).send({status: 'FAILED', data: { error: "You must to select a image type file"}});

    try {
        const postedTask = await taskService.postTask(file);
        res.status(201).send({status: 200, data: {task: postedTask.id}});
    } catch (error) {
        res.status(error.status || 500).send({status: "FAILED", data: {error: error.message || error}})
    }
}

module.exports = {
    getTaskById,
    createTask
};