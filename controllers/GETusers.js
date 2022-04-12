const express = require("express");
const router = express.Router();


const requireLogin = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.get("/users", requireLogin, (req, res) => {
    const user = req.user
    User.findOne({ user : user })
    res.json({ user })
  })