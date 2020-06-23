const express = require("express");
const Config = require("./config/dbconfig");
const ImageModel = require("./model/ImageObject.model");
const bodyParser = require("body-parser");
const app = express();

Config.init();

app.use(bodyParser.urlencoded({extended: true}));

const Image = ImageModel.get();



/**
 * Add image to the database
 *
 * @[Request Object]
 * {
 *  url: String,
 *  name: String,
 *  type: String,
 * }
 */
app.post("/api/image/add", (req, res) => {
  const picture = new ImageModel.resolveObject(req.body);
  console.log(picture);
  
  picture.save((err, result)=>{
    if(err){
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }

  });
  
});

app.listen(3000, () => {
  console.log("...Server listening at 3000");
});
