if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()

app.use("/qiwi", require("./routes/qiwi"))

app.get("/", (req, res) => {
  res.json({ ok: true })
})

const PORT = process.env.PORT ?? 5000
app.listen(PORT, () => console.log(`Server started at ${PORT}...`))