const Task = require('../database/Task');
const {v4: uuid} = require('uuid')
const path = require('path');


const getTaskById = (taskId) => { 
    const task = Task.getTaskById(taskId);
    return task; 
};

const postTask = async (file) => {

    const filename = file.name.toLowerCase()
    const originalImagePath = path.join('./originals/', filename)
    
    await file.mv(originalImagePath, async (err) => {
        if(err) throw { status: err?.status || 500, message: err?.message || 'Error moving files'}
    })
    const taskToInsert = {
        id: uuid(),
        status: Task.TASK_STATUS.UPLOADING,
        createdAt: new Date().toLocaleString("en-US", {timezone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timezone: "UTC"})
    }
    const taskCreated = Task.createTask(taskToInsert)
    return taskCreated; 
};


module.exports = {
    getTaskById,
    postTask
}