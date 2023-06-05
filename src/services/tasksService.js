const Task = require('../database/Task');


const getTaskById = () => { 
    const task = Task.getTaskById();
    return task; 
};

const postTask = () => { 
    const taskCreated = Task.createTask()
    return taskCreated; 
};


module.exports = {
    getTaskById,
    postTask
}