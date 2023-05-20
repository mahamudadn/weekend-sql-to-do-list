const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
// const pool = require("../modules/pool");
const addToDoRouter = require('./routes/addToDorouter');




app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

// ROUTE
app.use('/listItems',addToDoRouter );






app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });