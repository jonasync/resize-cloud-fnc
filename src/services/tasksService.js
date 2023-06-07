const Task = require('../database/Task');
const path = require('path');
const fs = require('fs')


const getTaskById = (taskId) => { 
    const task = Task.getTaskById(taskId);
    return task; 
};

const postTask = async (file) => {

    const filename = file.name.toLowerCase()
    const originalImagePath = path.join('./originals/', filename)
    const md5 = file.md5;
    
    if(!fs.existsSync('./originals/')) fs.mkdirSync('./originals/')  
    
    await file.mv(originalImagePath, async (err) => {
        if(err) throw { status: err?.status || 500, message: err?.message || 'Error moving files'}
    })

    const taskToInsert = Task.newTask({ id: md5, path: 's'})
    const taskCreated = Task.saveTask(taskToInsert)
    return taskCreated; 
};


module.exports = {
    getTaskById,
    postTask
}