const express = require("express");
const Config = require("./config/dbconfig");
const ImageModel = require("./model/ImageObject.model");
const bodyParser = require("body-parser");
const app = express();
const urlMetadata = require('url-metadata');



Config.init();

app.use(bodyParser.urlencoded({extended: true}));

const Image = ImageModel.get();


function textLike(str){
  var escaped = str.replace(/[(\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  return new RegExp(escaped, 'i');
}



/**
 * Get Images from the database 
 * 
 *
 * @[Response Object]
 * {
 *  _id: MongoDB Object iD,
 *  name: String,
 *  url: String,
 *  type: String, 
 * }
 */
app.get("/api/image/search", (req, res) =>{
 
  const name = req.query.nameString;
  const limit = req.query.limit;
  const offset = req.query.offset;

  Image.find({ name: name? new textLike(name) : ""},(err, result) => {
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  }).limit(limit ? parseInt(limit) : 50).skip(offset ? parseInt(offset) : 0);

});


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
