const mongoose = require("mongoose");


const imgObjectSchema = {
  url: String,
  name: String,
  type: String,
  metadata: Object,
};

const Image = mongoose.model("Image", imgObjectSchema);

function findExtension(val){
  var type;
  var knownImageTypes = ['tiff', 'bmp', 'jpeg', 'jpg', 'png', 'gif', 'eps', 'raw'];
  knownImageTypes.forEach(function(imageType){
    if(val.includes(imageType)){
      type = imageType;
    } 
  });
  return type;
}


module.exports.get = function(){
  return Image;
};

module.exports.resolveObject = function(body){
	
      return new Image({
		url: body.url,
		name: body.name,
		type: body.type,
		metadata: {
			extType: findExtension(body.url),
			size: body.size,
		},
	  });
 
  
};
