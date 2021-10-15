const express = require("express")
const router = express.Router()
// const qiwi = require("../services/qiwi")
const QiwiApi = require("@qiwi/bill-payments-node-js-sdk")

const qiwi = new QiwiApi(process.env.QIWI_PRIVATE_KEY)

router.post("/payment", async (req, res) => {
  const { billId, amount, currency, comment, expirationDateTime, customFields } = req.body
  
  try {
    const data = await qiwi.createBill(billId, {
      amount,
      currency,
      comment,
      expirationDateTime,
      customFields,
    })
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
    const data = await qiwi.getBillInfo(id)
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
    const data = await qiwi.cancelBill(id)
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