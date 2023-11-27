const connection = require('./connection');

const listTasks = async (idUser) => {
    const [tasks] = await connection.promise().query(
        'SELECT * FROM tasks WHERE id_user = ? order by id desc;',
        [idUser]
    );
    return tasks;
};

module.exports = {
    listTasks,
};
