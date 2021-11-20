const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//template of the user accounts


const accountSchema =  new Schema({
    /*user_ID:{
        type: String,
        required: true
    },*/
    user_Email:{
        type: String,
        required: true
    },
    f_Name:{
        type: String,
        required: true
    },
    l_Name:{
        type: String,
        required: true
    },
    
    user_Password:{
        type: String,
        required: true
    },
    user_ProfileImg_ID:{
        type: String,
      //  required: true
    },

}, {timestamps: true});


//const Acc = mongoose.model('Acc', accountSchema);

module.exports = Acc = mongoose.model('Acc', accountSchema);