const Task = require('../database/Task');
const {v4: uuid} = require('uuid')


const getTaskById = () => { 
    const task = Task.getTaskById();
    return task; 
};

const postTask = (task) => { 
    const taskToInsert = {
        ...task,
        id: uuid(),
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