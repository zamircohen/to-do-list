const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { User } = require("./models/user")
const { Todo } = require("./models/todo")
const { Label } = require("./models/label")
const bodyParser = require("body-parser")
const multer = require("multer")
const cors = require("cors");
const res = require("express/lib/response");
const path = require("path");


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


// const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads" });
// app.use(upload.single("uploaded-file"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({storage}).array("file")

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.files)
  })
})



app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"))
});

  

// GET USER INFORMATION TO SHOW IN FRONTEND
app.get("/users", requireLogin, (req, res) => {
  const user = req.user
  User.findOne({ user : user })
  res.json({ user })
})



// GET LIST OF TO DO POSTS
app.get("/mytodos", requireLogin, async (req, res) => {
  const mysort = { date: -1 }
  const user = req.user
  const entries = await Todo
      .find({ user: user.userId })
      .sort(mysort)
      .populate("user")
      .exec();
  res.json({ entries });
});



// GET SPECIFIC TO DO ITEM
app.get("/todo/:todoId", requireLogin, async (req, res) => {
  const todoId = req.params.todoId
  const entry = await Todo
        .findOne({ _id: todoId })
        res.json({ entry });
});



//************************************************************

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
      // await User.updateOne({ token: token }) // Ta eventuellt bort
      res.json({ token })
      
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
app.post("/todo", requireLogin, async (req, res) => {
  const { todo } = req.body
  const user = req.user
  const newEntry = new Todo({ todo, user: user.userId })
  await newEntry.save()
  res.json({ newEntry })
})


app.post("/label", requireLogin, async (req, res) => {
  const { label } = req.body
  const todo = req.todo
  const newEntry = new Label({ todo, user: user.userId })
  await newEntry.save()
  res.json({ newEntry })
})


app.post("/checkbox", requireLogin, async (req, res) => {
  const { todo_id } = req.body
  await Todo.updateOne( {_id: todo_id}, [ { "$set": { "isDone": { "$eq": [false, "$isDone"] } } } ] )
  res.json( {todo_id} )
})




app.post("/todo/:todoId", requireLogin, async (req, res) => {
  const todoId = req.params.todoId
  const filter = {"_id": todoId}
  const { todo, description, file } = req.body;

  console.log(todo, description, file) 

  Todo.findOneAndUpdate(filter, {$set: {todo : todo, description: description, file: file}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.redirect("/mytodos")
  })
})




app.post("/todo/upload/:todoId", requireLogin, (req, res) => {
      const todoId = req.params.todoId
      const filter = {"_id": todoId}

      const { file } = req.body;
      console.log(file) 

      Todo.findOneAndUpdate(filter, {$set: {file: file }}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      upload.array("file")
      res.send("Files uploaded successfully!");
      // res.redirect("/mytodos")
})
})





//CONNECTIONS
mongoose.connect("mongodb://127.0.0.1/backend2");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


