const fs = require("fs");
const path = require("node:path");

const messagesFile = path.join(__dirname, "messages.json");
let messages = [];


if (fs.existsSync(messagesFile)) {
    const fileData = fs.readFileSync(messagesFile, "utf8");
    messages = JSON.parse(fileData);
}

// save messages to the file
const saveMessages = () => {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), "utf8");
}

module.exports = {
    messagesFile,
    messages,
    saveMessages,
}