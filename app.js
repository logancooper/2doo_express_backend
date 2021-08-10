'use strict';

//set up http module
const http = require("http");
const hostname = "127.0.0.1";
const port = "3434";
const cors = require('cors');

//set up express app
const express = require("express");
const app = express();

//???
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(cors());

//create server
const server = http.createServer(app);

//tell server to listen
server.listen(port,hostname, ()=>{
    console.log(`Server is running at http://${hostname}:${port}`);
});

//import routers
const tasksController = require("./routes/tasks");

//tell the app to use those routers
app.use("/tasks", tasksController);