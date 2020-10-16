require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/User');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.listen(8000, function(){
    console.log("All good!");
    console.log("Running on http://localhost:8000");
});