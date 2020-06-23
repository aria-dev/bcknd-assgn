const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017/bckndDB";

module.exports.init = function(){
  mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
};
