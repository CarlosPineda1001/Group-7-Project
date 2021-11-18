const mongoose = require('mongoose');
const schema = mongoose.Schema;
//template of the user accounts


const accountSchema =  new Schema({
    user_ID:{
        type: int,
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
    user_Email:{
        type: String,
        required: true
    },
    user_Password:{
        type: String,
        required: true
    },
    user_ProfileImg_ID:{
        type: int,
        required: true
    }
});


const Acc = mongoose.model('Acc', accountSchema);

module.export = Acc;