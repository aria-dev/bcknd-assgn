const mongoose = require("mongoose");


const imgObjectSchema = {
  url: String,
  name: String,
  type: String
};

const Image = mongoose.model("Image", imgObjectSchema);

module.exports.get = function(){
  return Image;
};

module.exports.resolveObject = function(body){
  return new Image({
    url: body.url,
    name: body.name,
    type: body.type
  });
};
