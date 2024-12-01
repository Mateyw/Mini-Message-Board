// load env variables 
require("dotenv").config();

// import express lib
const express = require("express");
// init express app
const app = express();

// import unique identifier lib
const { v4: uuidv4 } = require('uuid'); 
// import path module
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const formRouter = require("./routes/formRouter");
const msgDetailsRouter = require("./routes/msgDetailsRouter");
const err404Router = require("./routes/err404Router");
const getFormattedTime = require("./formattedTime");
const { messagesFile, messages, saveMessages } = require("./storeMessages");
const deleteRouter = require("./routes/deleteRouter");


// set path to the views folder with template files (.ejs)
// first value is the name of the folder (views)
// second value is the path to the folder views
app.set("views", path.join(__dirname, "views"));
// set view engine to ejs (embedded javascript)
app.set("view engine", "ejs");

// make public folder with assets available for front end
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// use express.urlencoded()  when application handles form submissions with the POST method
// use extended: true for better parsing of nested data structures ( e.g. user[info][email] -> user:{info: { email: someValue } } )
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", formRouter);
app.use("/details", msgDetailsRouter);
app.use("/messages", deleteRouter);
app.get("/messages", (req, res) =>{
    res.sendFile(messagesFile);
});

app.post("/new", (req, res) => { 
     const newMessage = {
        id: uuidv4(), // unique identifier for the message
        text: req.body.messageText,
        user: req.body.messageUser,
        added: getFormattedTime()
    };

    

    messages.push(newMessage);
    saveMessages(); // save updated messages to the file
    res.redirect("/");
});

app.use("/delete", deleteRouter);

// handle invalid routes (404)
app.use(err404Router);

const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));

