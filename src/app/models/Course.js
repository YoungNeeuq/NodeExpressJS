const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {type:String,require : true},
  description: {type:String,maxLength:255},
  image: {type:String,maxLength:255},
  createdAt:{type: Date, default:Date.now},
  updatedAt:{type: Date, default:Date.now},
  slug:{type:String,slug:'name',unique:true}
});

module.exports = mongoose.model('Course', Course);