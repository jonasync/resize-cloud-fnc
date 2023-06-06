
const {db} = require('./index');


const tasksRef = db.collection('tasks');

const getTaskById = async () => {
    const taskIDRef = await tasksRef.doc('keurXh4Zh0qM0hnIUKA6')
    const task = await taskIDRef.get();
    if (!task.exists) {
        console.log('No such document!');
        return {};
      } else {
        const res = task.data();
        console.log(res);
        return res;
      }
}

const createTask = async (task) => {
    const newTask = await tasksRef.add(task);
    console.log(task)
    return task;
}

module.exports = {
    getTaskById,
    createTask
};