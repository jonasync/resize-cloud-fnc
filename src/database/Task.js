
const {db} = require('./index');


const tasksRef = db.collection('tasks');


const TASK_STATUS = {
    UPLOADING: "UPLOADING",
    CREATING_THUMBNAILS: "CREATING_THUMBNAILS",
    PROCESSING: "PROCESSING",
    DONE: "DONE",
    FAILED: "FAILED"
}

const getTaskById = async (taskId) => {
    try {
        const taskIDRef = await tasksRef.doc(taskId)
        const task = await taskIDRef.get();
        if (!task.exists) {
            throw { status: 404, message: 'Task not found' }
        } else {
            return task.data();
        }
    } catch (error) {
        throw { status: 500, message: error.message || error }
    }
}

const createTask = async (task) => {
    try {
        await tasksRef.doc(task.id).set(task);
        return task;
    } catch (error) {
        throw { status: 500, message: error.message || error    }
    }
}


module.exports = {
    getTaskById,
    createTask,

    TASK_STATUS
};