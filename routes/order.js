const express = require("express");
const router = express.Router();
const orderSchema = require("../schema/orderSchema");

router.post("/add", (req, res) => {
  if (req.body.Adress) {
    res.status(406).send({ success: false, msg: "please fill all value" });
  } else {
    const order = new orderSchema({ ...req.body })
    order.save((err, data) => {
      if (err) {
        res.status(406).send({ success: false, msg: "order not register" });
      } else {
        var OrderId = order._id.toString();
        orderSchema.findByIdAndUpdate(
          { _id: order._id },
          { $set: { OrderId: OrderId.slice(OrderId.length - 5) } },
          (err, updateId) => {
            if (err) {
              res.status(406).send({
                success: false,
                msg: "Error can not change  name of _id",
                err1: err
              });
            } else {
              res.json({
                success: true,
                msg: "sucessfully add your order",
                // data: updateId
                OrderId: OrderId.slice(OrderId.length - 5)
              });
            }
          }
        );
      }
    });
  }
});

router.get("/getAll", (req, res) => {
  orderSchema.find({}, (err, data) => {
    if (err) {
      return res.json({ success: false, msg: "Error" })
    }
    else {
      return res.json({ success: true, data })
    }
  })

})

module.exports = router;
