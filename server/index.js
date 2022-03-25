const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { User } = require("./models/user")

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json())




app.get("/api", (req, res) => {
    res.json({ message: "Your TO-DO list" });
  });



app.post("/users", async (req, res) => {
  const {username, password} = req.body
  const user = new User({username, password})
  await user.save()
  res.json({username})
})





//CONNECTIONS
mongoose.connect("mongodb://127.0.0.1/backend1/to_do_list");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});