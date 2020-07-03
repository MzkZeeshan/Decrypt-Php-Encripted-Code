const express = require("express");
const router = express.Router();
const addPrduct = require("../schema/productSchema");
router.post("/add", (req, res) => {
  // console.log("req", req);
  console.log("res", req.body);
  if (!req.body.Name) {
    res.json({ success: false, mag: "Enter all values" });
  }
  {
    const add = new addPrduct({
      Name: req.body.Name,
      Price: req.body.Price,
      SpecailPrice: req.body.SpecialPrice,
      VenderId: req.body.VendorId,
      Quantity: req.body.Quantity,
      SmallDiscription: req.body.SmallDiscription,
      LargeDiscription: req.body.LargeDiscription,
      CategoryId: req.body.CategoryId,
      SubCategoryId: req.body.SubCategoryId,
      CreatedDate: req.body.CreatedDate,
      ModifiedDate: req.body.ModifiedDate,
      View: req.body.View,
      Ordered: req.body.Ordered,
      SpecialPrice: req.body.SpecialPrice,
      Images: req.body.Images
    });
    add.save((err, product) => {
      if (err) {
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", err);
        res
          .status(406)
          .send({ success: false, msg: "alerdy product exist", err1: err });
      } else {
        var P_Id = product._id.toString();
        addPrduct.findByIdAndUpdate(
          { _id: product._id },
          { $set: { ProductId: P_Id.slice(P_Id.length - 5) } },
          (err, updateId) => {
            if (err) {
              res.status(406).send({
                success: false,
                msg: "Error can not change  name of _id",
                err1: err
              });
            } else {
              console.log("data of user", product);

              res.json({
                success: true,
                msg: "sucessfully add your product",
                productData: updateId
              });
            }
          }
        );
      }
    });
  }
});



router.get("/getAll", (req, res) => {
  addPrduct.find({}, (err, data) => {
    if (err) {
      return res.json({ success: false, msg: "Error" })
    }
    else {
      return res.json({ success: true, data })
    }
  })

})

module.exports = router;
