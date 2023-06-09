
const {db} = require('./index');
const { STATUS } = require('../utils/CONSTANTS');


const tasksRef = db.collection('tasks');

const getTasksWhere = async (field, compare, value) => {
    let results = [];
    const docs = await tasksRef.where(field, compare, value).get();

    if (!docs.empty) { 
        console.log(`founded ${docs.lenght} results`); 
        docs.forEach(child => {
            results.push(child.data())
        });
    }
    return results;
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
    } catch (err) {
        throw { status: err?.status || 500, message: err.message || err }
    }
}

const updateTaskById = async (taskId, data) => {
    try {
        await tasksRef.doc(taskId).update(data);
        return true;
    } catch (error) {
        throw { status: 500, message: error.message || error    }
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
    const {id, path, parentId} = data;
    return {
        id,
        parentId: parentId || null,
        path,
        status: data.status || STATUS.PENDING,
        createdAt: now,
        updatedAt: now
    }
}


module.exports = {
    getTaskById,
    newTask,
    saveTask,
    updateTaskById,
    getTasksWhere
};