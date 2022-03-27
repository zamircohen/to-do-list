const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { User } = require("./models/user")
const { Todo } = require("./models/todo")
const bodyParser = require("body-parser")
const cors = require("cors")

// const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT || 3001;
const app = express();
const JWT_SECRET = "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw"

// MIDDLEWARES
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use((req, _res, next) => {
  const authHeader = req.header("Authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    req.user = jwt.verify(token, JWT_SECRET)
  }
  next()
})


const requireLogin = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}


// const router = express.Router()

// router.get("/api")
// router.get("/secret")

// app.use("/auth", requireLogin, router)



app.get("/api", (req, res) => {
    res.json({ message: "Your TO-DO list" });
  });

  

// TEST - SECRET PAGE THAT SHOWS ONLY IF A USER IS LOGGED IN
// app.get("/secret", requireLogin, (req, res) => {
//     res.json({message: `Hello again ${req.user.username}`})
// })


app.get("/users", requireLogin, (req, res) => {
  const user = req.user
  User.findOne({ user : user })
  res.json({ user })
})


// app.get("/users", requireLogin, (_req, res) => {
//   res.json({ username : `This has to work with a user from database instead` })
// })




// LOGIN 
app.post("/login", async (req, res) => {
    const {username, password} = req.body
    const user = await User.login(username, password)
    if (user) {
      const userId = user._id.toString()
      const token = jwt.sign(
        {userId, username: user.username},
        JWT_SECRET,
        {expiresIn: "1h", subject: userId}
      )
      res.json({token})
      
    } else {
      res.sendStatus(401)
    }
})



app.post("/users", requireLogin, async (req, res) => {
  const user = req.user
  await User.findOne({ user : user.username })
  res.json({ user })
})



// CREATE USER
app.post("/create", async (req, res) => {
  const {username, password} = req.body
  const user = new User({username, password})
  await user.save()
  res.json({username})
})



// CREATE POST
// app.post("/todo", async (req, res) => {
//   const { item, user, date, done } = req.body
//   const todo = new Todo({item, user, date, done})
//   await todo.save()
// })

app.post("/todo", async (req, res) => {
  const { todo } = req.body
  const user = req.user
  const newEntry = new Todo({ todo })
  await newEntry.save()
  console.log(`This is the user ${user}`)
  res.json({user})
  // console.log(`This is from the server: ${todo}`)
})





//CONNECTIONS
mongoose.connect("mongodb://127.0.0.1/backend2");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});