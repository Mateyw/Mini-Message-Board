const { Router } = require("express");
const err404Router = Router();

err404Router.use((req, res) => { 
    res.status(404).render("404", { title: "404 | Page Not Found" });
});

module.exports = err404Router;