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



addToDoRouter.get('/:id', (req, res) => {

    const idToAdd = req.params.id;
    let queryText = 'SELECT FROM "" WHERE "id"= $1;';
    pool.query(queryText, [idToAdd])
        .then((result) => {
            console.log(`weekend-to-do-app with id ${idToAdd}, ${result.rows}`);
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error with getting a weekend-to-do-app id', error);
            res.sendStatus(500);
        })
})



module.exports = addToDoRouter