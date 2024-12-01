const { Router } = require("express");
const formRouter = Router();

formRouter.get("/", (req, res) => { 
    res.render("form", { title: "new Message Form" });
});

module.exports = formRouter;