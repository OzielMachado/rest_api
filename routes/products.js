const express = require('express');
const router = express.Router();
const users = require('../services/products');

router.get('/', async function(req, res, next){
    try {
        res.json(await users.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting products`, err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await users.create(req.body));
    } catch(err){
        console.error(`Error while creating product`, err.message);
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await users.update(req.params.id, req.body));
    } catch(err){
        console.error(`Error while updating product`, err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try{
        res.json(await users.remove(req.params.id));
    } catch(err){
        console.error(`Error while deleting product`, err.message);
        next(err);
    }
});

module.exports = router;