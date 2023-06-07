const Task = require('../database/Task');
const path = require('path');
const fs = require('fs');
const { getImageInfo, getPath } = require('../utils/images');
const { saveImage } = require('../database/Image');


const getTaskById = (taskId) => { 
    const task = Task.getTaskById(taskId);
    return task; 
};

const postTask = async (file) => {
    
    const { finalPath, newPath } = getPath(file, file.md5)

    // Create new path
    fs.mkdirSync(newPath, { recursive: true }); 
    
    // Upload original image
    await file.mv(finalPath, async (err) => {
        if(err) throw { status: err?.status || 500, message: err?.message || 'Error moving files'}
    })

    const md5 = file.md5;
    // Save new task on database(firebase)
    const taskToInsert = Task.newTask({ id: md5, path: finalPath, status: Task.TASK_STATUS.DONE})
    const taskCreated = await Task.saveTask(taskToInsert)
    
    // Save new image on database(firebase)
    const imageInfo = getImageInfo({file, path: finalPath, md5});
    await saveImage(imageInfo)
    return taskCreated; 
};


module.exports = {
    getTaskById,
    postTask
}