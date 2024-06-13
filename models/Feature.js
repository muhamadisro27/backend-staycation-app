const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema({
   name : {
      type: String,
      required : true
   },
   qty : {
      type : Number,
      required : true
   },
   imgURL : {
      type : String,
      required : true
   }
})

module.exports = mongoose.model('Feature', featureSchema)