const express = require("express");
const router = express.Router();

router.get("/get", (res, req) => console.log("user work"));

module.exports = router;
