const { Router } = require("express");
const { messages, saveMessages } = require("../storeMessages");

const deleteRouter = Router();

deleteRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    // find the message index
    const messageIndex = messages.findIndex((msg) => msg.id === id);

    if (messageIndex === -1) {
        return res.status(404).json({ error: "Message not found" });
    }

    // remove the message from the array
    messages.splice(messageIndex, 1);

    // save updated messages back to the file
    saveMessages();

    res.status(200).json({ success: true, message: "Message deleted successfully" });
});

module.exports = deleteRouter;
