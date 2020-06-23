const express = require("express");
const Config = require("./config/dbconfig");
const ImageModel = require("./model/ImageObject.model");
const bodyParser = require("body-parser");
const app = express();

Config.init();

app.use(bodyParser.urlencoded({extended: true}));

const Image = ImageModel.get();

app.post("/api/image/add", (req, res) => {
  const picture = new ImageModel.resolveObject(req.body);
  console.log(picture);
  res.send("OK");
});

app.listen(3000, () => {
  console.log("...Server listening at 3000");
});
