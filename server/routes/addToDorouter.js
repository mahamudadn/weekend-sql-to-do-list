const express = require('express');
const AddToDoRouter = express.Router();

//DB CONNECTION.

const pool = require("../modules/pool");

//POST

AddToDoRouter.post('/', (req, res) =>{
    const addNew = req.body
    console.log('req.body', req.body);
})