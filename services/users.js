const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from users limit ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(user){
    const result = await db.query(
        `insert into users values
        (default, "${user.name}", "${user.email}", "${user.password}")`
    );

    let message = 'Error in creating user';

    if(result.affectedRows){
        message = 'User created successfully';
    }

    return {message};
}

async function update(id, user){
    const result = await db.query(
        `update users set
        name="${user.name}",
        email="${user.email}",
        password="${user.password}"
        where id=${id}`
    );

    let message = 'Error in updating user';

    if(result.affectedRows){
        message = 'User updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
        `delete from users where id=${id}`
    );

    let message = 'Error in deleting user';

    if(result.affectedRows) {
        message = 'User deleted successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}
