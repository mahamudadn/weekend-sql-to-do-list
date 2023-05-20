const express = require('express');
const AddToDoRouter = express.Router();

//DB CONNECTION.

const pool = require("../modules/pool");

//POST

AddToDoRouter.post('/', (req, res) =>{
    const addNew = req.body
    console.log('req.body', req.body);
    const queryText = `
    INSERT INTO "weekend-to-do-app"("To-Do", "complete")
    VALUES($1,$2)
    `
    const values = [addNew.To-Do, addNew.complete]
    pool.query.apply(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Query text', queryText, 'error', error)
            res.sendStatus(500);
        })



})