const express = require("express")
const router = express.Router()
const qiwi = require("../services/qiwi")

router.get("/payment", async (req, res) => {
  try {
    const data = await qiwi.createBill(1, "RUB", req.headers.host)
    console.log(data)
    res.json(data)
  }
  catch(error) {
    // console.log(error)
    res.json({ ok: false })
  }
})

router.get("/check/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await qiwi.check(id)
    console.log(data)
    res.json(data)
  }
  catch(error) {
    console.log(error)
    res.json({ ok: false })
  }
})

router.get("/cancel/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await qiwi.cancel(id)
    console.log(data)
    res.json(data)
  }
  catch(error) {
    console.log(error)
    res.json({ ok: false })
  }
})

router.get("/success", (req, res) => {
  const { bill_id, payment } = req.query
  res.json({ bill_id, payment })
})

module.exports = router