const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//template of the account files


const accountSchema =  new Schema({
    f_Name:{
        type: String,
        required: true
    },
    l_Name:{
        type: String,
        required: true
    },
    user_Email:{
        type: String,
        required: true
    },
    user_Password:{
        type: String,
        required: true
    },
});


const Acc = mongoose.model('Acc', accountSchema);

module.exports = Acc;