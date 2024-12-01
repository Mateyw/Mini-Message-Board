const { messages } = require("../storeMessages");
const { Router } = require("express");
const msgDetailsRouter = Router();

msgDetailsRouter.get("/:id", (req, res) => {
    const { id } = req.params;

    const message = messages.find(msg => msg.id === id);

    if (!message) {
        return res.status(404).send("Message not found");
    }

    res.render("msgDetails", { title: "Message Details", message });
});

module.exports = msgDetailsRouter;


