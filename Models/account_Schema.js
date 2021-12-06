const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//template of the user accounts


const accountSchema =  new Schema({
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
    },
    user_Role:{
        type:Boolean
    }

}, {
    timestamps: true,
    versionKey: false 
});

module.exports = Acc = mongoose.model('Acc', accountSchema);
