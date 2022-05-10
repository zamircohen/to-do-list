const express = require("express");
const router = express.Router();

const { Todo } = require("../models/todos");

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
};

router.post("/tags", requireLogin, async (req, res) => {
    const { tag } = req.body;
    const todoTags = await Todo
        .find({ user: req.user.userId, tagList: tag })
        .populate("user")
        .exec();
    // console.log(todoTags);
    res.json({ todoTags });
})

exports.router = router;