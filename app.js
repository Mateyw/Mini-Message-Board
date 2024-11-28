// load env variables 
require("dotenv").config();

// import path module
const path = require("node:path");
const fs = require("fs");

// import express lib
const express = require("express");

// init express app
const app = express();

const getFormattedTime = require("./formattedTime");
const messagesFile = path.join(__dirname, "messages.json");



// set path to the views folder with template files (.ejs)
// first value is the name of the folder (views)
// second value is the path to the folder views
app.set("views", path.join(__dirname, "views"));
// set view engine to ejs (embedded javascript)
app.set("view engine", "ejs");

// make public folder with assets available for front end
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));


// variables
// must be let, not const. for dynamic add of messages
let messages = [];


if (fs.existsSync(messagesFile)) {
    const fileData = fs.readFileSync(messagesFile, "utf8");
    messages = JSON.parse(fileData);
}

// Save messages to the file
function saveMessages() {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), "utf8");
}

// routes
app.get("/", (req, res) => { 
    res.render("index", { title: "Mini Messageboard", messages});
});

app.get("/new", (req, res) => { 
    res.render("form", { title: "new Message Form" });
});

app.get("/details", (req, res) => { 
    res.render("msgDetails", { title: "Message Details" });
});

app.post("/new", (req, res) => { 
    const newMessage = {
        text: req.body.messageText,
        user: req.body.messageUser,
        added: getFormattedTime()
    };

    messages.push(newMessage);
    saveMessages(); // save updated messages to the file
    res.redirect("/");
});


const PORT = process.env.PORT || 5050;

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));