const { messages } = require("../storeMessages");

const { Router } = require("express");
const indexRouter = Router();
indexRouter.get("/", (req, res) => { 
    res.render("index", { title: "Mini Messageboard", messages});
});

module.exports = indexRouter;
