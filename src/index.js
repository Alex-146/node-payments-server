if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const session = require("express-session")
const app = express()

const passport = require("./services/passport")
const { authUser } = require("./middleware/auth")

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

app.use("/qiwi", require("./routes/qiwi"))
app.use("/auth", require("./routes/auth"))

app.get("/", (req, res) => {
  res.json({ ok: true })
})

app.get("/profile", authUser(), (req, res) => {
  res.json(req.user)
})

app.get("/logout", (req, res) => {
  req.logOut()
  req.session.destroy()
  res.send("goodbye")
})

const PORT = process.env.PORT ?? 5000
app.listen(PORT, () => console.log(`Server started at ${PORT}...`))