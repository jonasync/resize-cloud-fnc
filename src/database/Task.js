
const {db} = require('./index');


const tasksRef = db.collection('tasks');


const TASK_STATUS = {
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

const saveTask = async (task) => {
    try {
        await tasksRef.doc(task.id).set(task);
        return task;
    } catch (error) {
        throw { status: 500, message: error.message || error    }
    }
}

const newTask = (data) => {
    const now = new Date().toLocaleString("en-US", {timezone: "UTC"});
    const {id, path} = data
    return {
        id,
        path,
        status: data.status || TASK_STATUS.PROCESSING,
        createdAt: now,
        updatedAt: now
    }
}


module.exports = {
    getTaskById,
    newTask,
    saveTask,

    TASK_STATUS
};