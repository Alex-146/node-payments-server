const express = require("express")
const router = express.Router()
const qiwi = require("../services/qiwi")

router.post("/payment", async (req, res) => {
  const { amount } = req.body
  if (!amount) {
    return res.status(400).json({ ok: false })
  }

  try {
    const data = await qiwi.createBill(amount, "RUB", req.headers.host)
    res.json(data)
  }
  catch(error) {
    console.log("create", error.message)
    res.status(500).json({ ok: false })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await qiwi.check(id)
    res.json(data)
  }
  catch(error) {
    console.log("check", error.message)
    res.status(500).json({ ok: false })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await qiwi.cancel(id)
    res.json(data)
  }
  catch(error) {
    console.log("cancel", error.message)
    res.status(500).json({ ok: false })
  }
})

router.get("/success", (req, res) => {
  const { bill_id, payment } = req.query
  const o = { bill_id, payment }
  console.log(o)
  res.json(o)
})

module.exports = router