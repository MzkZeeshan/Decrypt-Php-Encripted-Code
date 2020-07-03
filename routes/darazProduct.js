const express = require("express");
const router = express.Router();
const addPrduct = require("../schema/darazProductSchema");
router.post("/add", (req, res) => {
  // console.log("req", req);
  console.log("res", req.body);
  if (!req.body.name) {
    res.json({ success: false, mag: "Enter all values" });
  }
  {
    const add = new addPrduct({ ...req.body });
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

            console.log("ERROR", err)
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



router.post("/update", (req, res) => {
  // console.log("req", req);
  console.log("res", req.body);
  if (!req.body.ProductId) {
    res.json({ success: false, mag: "Enter all values" });
  }
  {

    const id = req.body.ProductId.toString()

    addPrduct.findOneAndUpdate(
      { ProductId: id },
      { $set: { ...req.body } },
      (err, data) => {
        console.log("ERROR", err)
        if (err) {
          res.status(406).send({
            success: false,
            msg: "Error can not change  name of _id",
            err1: err
          });
        } else {
          console.log("data of user", data);
          res.json({
            success: true,
            msg: "sucessfully add your product",
            data: req.body
          });
        }
      }
    );

  }
});


router.get("/delete/:ProductId", async (req, res) => {
  try {
    const ProductIss = req.params.ProductId
    const data = await addPrduct.findOneAndDelete({ ProductId: ProductIss })
    res.json({ success: true, data })


  }
  catch (error) {
    res.json({ success: false, msg: error })
  }
})

// router.get("/getAll", (req, res) => {
//   addPrduct.find({}, (err, data) => {
//     if (err) {
//       return res.json({ success: false, msg: "Error" })
//     }
//     else {
//       return res.json({ success: true, data })
//     }
//   })

// })

router.get("/getAll", async (req, res) => {
  try {
    const data = await addPrduct.find({}).sort({ $specail_price: -1 })
    res.json({ success: true, data })
  }
  catch (error) {
    res.json({ success: false, msg: error })
  }
})

router.get("/getbycategoryid/:CategoryId", async (req, res) => {
  try {
    const CategoryIds = req.params.CategoryId
    const data = await addPrduct.find({ CategoryId: CategoryIds }).sort({ $specail_price: -1 }).limit(21)

    if (data.length) {
      res.json({ success: true, data })
    }
    else {
      res.json({ success: false, msg: "No record found" })

    }
  }
  catch (error) {
    res.json({ success: false, msg: error })
  }
})

router.get("/getbycategoryid/onscroll/:CategoryId/:skip", async (req, res) => {
  try {
    const CategoryIds = req.params.CategoryId
    const skip = parseInt(req.params.skip)

    const data = await addPrduct.find({ CategoryId: CategoryIds }).skip(skip).limit(9)

    if (data.length) {
      res.json({ success: true, data })
    }
    else {
      res.json({ success: false, msg: "No record found" })

    }
  }
  catch (error) {
    res.json({ success: false, msg: error })
  }
})



router.get("/priceRange/:lt/:gt", async (req, res) => {
  try {
    const lt = parseInt(req.params.lt)
    const gt = parseInt(req.params.gt)

    const data = await addPrduct.find({ special_price: { $gt: lt, $lt: gt } }).limit(100)
    if (data.length) {
      res.json({ success: true, data })
    }
    else {
      res.json({ success: false, msg: "No record found" })

    }
  }
  catch (error) {
    res.json({ success: false, msg: error })
  }
})


router.get("/getByName/:productName", (req, res) => {
  const names = req.params.productName
  console.log("NAme", names)
  addPrduct.findOne({ name: { $regex: ".*" + names + ".*", $options: 'i' } }, (err, data) => {
    if (err) {
      return res.json({ success: false, msg: "Error" })
    }
    else {
      console.log("data", data)
      return res.json({ success: true, data })
    }
  })
})

router.get("/getbysearch/:search", async (req, res) => {
  try {
    const names = req.params.search

    const data = await addPrduct.find({ name: { $regex: ".*" + names + ".*", $options: 'i' } }).sort({ $specail_price: -1 }).limit(50)

    if (data.length) {
      res.json({ success: true, data })
    }
    else {
      res.json({ success: false, msg: "No record found" })

    }
  }
  catch (error) {
    res.json({ success: false, msg: error })
  }
})

router.get("/getlimit10/", async (req, res) => {

  const data = await addPrduct.aggregate([
    { $sort: { name: 1 } },
    { $limit: 5 }
  ]
  )
  return res.json({ success: true, data })



})

module.exports = router;
