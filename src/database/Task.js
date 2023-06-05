
const {db} = require('./index');


const tasksRef = db.collection('tasks');

const getTaskById = async () => {
    const taskIDRef = await tasksRef.doc('keurXh4Zh0qM0hnIUKA6')
    const task = await taskIDRef.get();
    if (!task.exists) {
        console.log('No such document!');
        return {};
      } else {
        console.log('Document data:', task.data());
        return task;
      }
}

const createTask = async () => {
    return await tasksRef.add({
        timestamp: '',
        path: '/../../',
        status: 1815
    });
}

module.exports = {
    getTaskById,
    createTask
};