const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from products limit ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(product){
    const result = await db.query(
        `insert into products values
        (default, "${product.description}", ${product.price})`
    );

    let message = 'Error in creating product';

    if(result.affectedRows){
        message = 'Product created successfully';
    }

    return {message};
}

async function update(id, product){
    const result = await db.query(
        `update products set
        description="${product.description}",
        price=${product.price}
        where id=${id}`
    );

    let message = 'Error in updating product';

    if(result.affectedRows){
        message = 'Product updated successfully';
    }

    return {message};
}

async function remove(id){
    const result = await db.query(
        `delete from products where id=${id}`
    );

    let message = 'Error in deleting product';

    if(result.affectedRows) {
        message = 'Product deleted successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}
