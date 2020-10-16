require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/User');
const issueRoutes = require('./routes/Issue');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/issues', issueRoutes);

app.listen(8000, function(){
    console.log("All good!");
    console.log("Running on http://localhost:8000");
});