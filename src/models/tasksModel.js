const connection = require('./connection');

const listTasks = async (idUser) => {
    const [tasks] = await connection.query(
        'SELECT * FROM tasks WHERE id_user = ? order by id desc;',
        [idUser]
    );
    return tasks;
};

const saveTask = async (task) => {
    const [tasks] = await connection.query(
        'INSERT INTO tasks (id_user, task, description, status, priority, date_end) VALUES (?,?,?,?,?,?);',
        [task.id_user, task.task, task.description, task.status, task.priority, task.date_and]
    );
    return tasks;
};

module.exports = {
    listTasks,
    saveTask
};
