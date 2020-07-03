const express = require("express");

const router = express.Router();
router.use("/product", require("./product"));
router.use("/darazProduct", require("./darazProduct"));

router.use("/order", require("./order"));
router.use("/user", require("./user"));
router.use("/category", require("./category"));


module.exports = router;
