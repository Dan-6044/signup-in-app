const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name:{
        type: String,
        trim: true,
        required : [true, 'Please add a Category Name'],
        maxLength: 32
    },
    
    

   
},{timestamps:true});

module.exports = mongoose.model("Category", categorySchema);