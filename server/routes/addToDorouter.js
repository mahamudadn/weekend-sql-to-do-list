const express = require('express');
const addToDoRouter = express.Router();

//DB CONNECTION.

const pool = require("../modules/pool");

//POST

addToDoRouter.post('/', (req, res) =>{
    const addNew = req.body
    console.log('req.body', req.body);
    const queryText = `
    INSERT INTO "weekend-to-do-app"("To-Do")
    VALUES($1)
    `
    const values = [addNew.task]
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Query text', queryText, 'error', error)
            res.sendStatus(500);
        })



})


module.exports = addToDoRouter