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
        [task.id_user, task.task, task.description, task.status, task.priority, task.date_end]
    );
    return tasks;
};

const findTaskByIdAndIdUser = async (idTask, idUser) => {
    const [res] = await connection.query(
        'SELECT * FROM tasks WHERE id=? AND id_user=? LIMIT 1;',
        [idTask, idUser]
    );
    if (res.length > 0) {
        return res[0];
    }
    return null;
};

const editTask = async (task) => {
    const [results] = await connection.query(
        'UPDATE tasks SET description=?, status=?, priority=?, date_end=?, status_date= NOW() WHERE id=? AND id_user=? LIMIT 1;',
        [task.description, task.status, task.priority, task.date_end, task.id, task.id_user]
    );

    return results.affectedRows > 0;
};

module.exports = {
    listTasks,
    saveTask,
    findTaskByIdAndIdUser,
    editTask
};
