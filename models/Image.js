const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
   imageURL : {
      type : String,
      required : true,
   }
})

module.exports = mongose.model("Image", imageSchema)