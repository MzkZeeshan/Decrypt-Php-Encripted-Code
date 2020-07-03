const express = require("express");
const fetch = require('node-fetch');
const axios = require("axios")
var crypto = require('crypto');
var Base64 = require('js-base64').Base64;

const app = express();
const cors = require("cors");
// const config = require("./config/db");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
// mongoose
//   .connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true })
//   .then(() => {
console.log("Mongo connected");
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.listen(port, (res, req) => {
  console.log("server listen on 5000");
});

// app.use("/", require("./routes/index.js"));

var decrypt = function (encrypted, method, secret, hmac) {
  // if (crypto.createHmac('md5', secret).update(encrypted).digest('hex') == hmac) {
  var iv = new Buffer.from(encrypted.substr(0, 16), 'base64').toString();
  console.log(iv)

  var decryptor = crypto.createDecipheriv(method, secret, iv);
  return decryptor.update(encrypted.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
  // }
};


app.use("/test", (req, res) => {


  axios(`http://eyval.co/2020/quvare/v2/api/edc.php?mode=encrypt&api_url=http://eyval.co/2020/quvare/v2/api/occupation/detail/?base_id=19-1023.00`)
    .then(data => {

      // console.log("parse", data.toString())

      console.log("AAAAAAAAAAAA", decrypt(data.data.toString(), "AES-256-CBC", "Quvare API sets", "sha256"))


      res.send(data.data)

    })
  // .then(json => {
  //   console.log("JSON", json)
  //   res.status(200).send(json);

  // }).catch(err => {
  //   res.status(400).send({
  //     message: "Somethig Went Wrong" + err
  //   })
  // });




});




  // })
  // .catch(e => console.log("erroe", e));
