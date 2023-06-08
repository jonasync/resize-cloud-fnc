const fs = require('fs');

const Task = require('../database/Task');
const { getImageInfo, getPath } = require('../utils/images');
const { saveImage } = require('../database/Image');
const { createResizedVersions } = require('./resizeServiceOnCloud');
const { STATUS } = require('../utils/CONSTANTS');



const getTaskById = async (taskId) => { 
    const task = await Task.getTaskById(taskId);
    let childrens = await Task.getTasksWhere('parentId', '==', taskId);
    if(childrens.length) {
        childrens = childrens.map(img => { 
            return {id: img.id, status: img.status}
        });
    }
    return {
        task: {
            id: task.id,
            status: task.status
        },
        childrens
    }; 
};

const postTask = async (file) => {
    
    const fileName = file.name;
    const { finalPath, newPath } = getPath(fileName, file.md5)

    // Create new path
    fs.mkdirSync(newPath, { recursive: true }); 
    
    // Upload original image
    await file.mv(finalPath, async (err) => {
        if(err) throw { status: err?.status || 500, message: err?.message || 'Error moving files'}
    })

    const md5 = file.md5;
    // Save new task on database(firebase)
    const taskToInsert = Task.newTask({ id: md5, path: finalPath, status: STATUS.PENDING})
    const taskCreated = await Task.saveTask(taskToInsert)
    
    // Save new image on database(firebase)
    const imageInfo = getImageInfo({file: file.data, path: finalPath, md5});
    await saveImage(imageInfo)
    
    try {
        // Launch the resize image but response immediately
        createResizedVersions(md5, file.data, fileName);
    } catch (err) {
        console.error(err)
        throw { status: err?.status || 500, message: err?.message || 'Error resizing images'}
    }
    return taskCreated; 
};


module.exports = {
    getTaskById,
    postTask
}