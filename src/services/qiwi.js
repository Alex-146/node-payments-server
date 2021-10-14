const QiwiPayments = require("@qiwi/bill-payments-node-js-sdk")

const qiwi = new QiwiPayments(process.env.QIWI_TOKEN)

function createBill(amount, currency, origin) {
  const billId = qiwi.generateId();
  const fields = {
    amount,
    currency,
    comment: `Оплата товара. Счёт: ${billId}`,
    expirationDateTime: qiwi.getLifetimeByHours(2),
    successUrl: `${origin}/qiwi/success?bill_id=${billId}&payment=qiwi`
  }

  return qiwi.createBill(billId, fields)
}

function check(billId) {
  return qiwi.getBillInfo(billId)
}

function cancel(billId) {
  return qiwi.cancelBill(billId)
}

module.exports = {
  createBill,
  check,
  cancel
}