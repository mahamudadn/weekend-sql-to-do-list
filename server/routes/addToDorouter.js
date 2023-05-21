const express = require('express');
const addToDoRouter = express.Router();

//DB CONNECTION.

const pool = require("../modules/pool");

//POST

addToDoRouter.post('/', (req, res) => {
    const addNew = req.body
    console.log('New Add To Do', addNew);
    const queryText = `
    INSERT INTO "weekend-to-do-app"("todo")
    VALUES($1);
    `
    const values = [addNew.task]
      pool.query(queryText, values)
        .then(result => {
          res.sendStatus(200);
        })
        .catch(error => {
         console.log('Query text', queryText, 'error', error)
          res.sendStatus(500);
        })



});

addToDoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "weekend-to-do-app";';
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Query:', queryText, 'Error:', error);
            res.sendStatus(500);
        })
});


addToDoRouter.get('/:id', (req, res) => {

    const idToAdd = req.params.id;
    let queryText = 'SELECT * FROM "weekend-to-do-app" WHERE "id"= $1;';
    pool.query(queryText, [idToAdd])
        .then((result) => {
            console.log(`weekend-to-do-app with id ${idToAdd}, ${result.rows}`);
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error with getting a weekend-to-do-app id', error);
            res.sendStatus(500);
        })
})


// DELETE
addToDoRouter.delete("/:id", (req, res) => {
    let idToDelete = req.params.id;
    let queryText = `DELETE FROM "weekend-to-do-app" WHERE "id" = $1;`;
    pool.query(queryText, [idToDelete])
        .then((result) => {
            console.log(`Add To do with id ${idToDelete}, was deleted.`);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log("Error", error);
            res.sendStatus(500);
        });

});

addToDoRouter.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let queryText = `UPDATE "weekend-to-do-app" SET "complete" = 'TRUE' WHERE "id" = $1;`;
    pool.query(queryText, [idToUpdate])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log("Error", error);
            res.sendStatus(500);
        });

})




module.exports = addToDoRouter;