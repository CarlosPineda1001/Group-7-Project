const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//template of the document files


const documentSchema =  new Schema({
    file_ID:[String],
    attach_FileID:[String],
    docu_Group:{
        type: String,
        // required: true
    },
    docu_Type:{
        type: String,
       // required: true
    },
    date_Exp:{
        type: Date,
        //required: true
    },
    date_Issued:{
        type: Date, 
       // required: true
    },
    date_Created:{
        type: Date, default: Date.now()
       // required: true
    },
    date_Lmodified:{
        type: Date, 
       // required: true
    },
    modded_by:{
        type: String,
        //required: true
    },
    created_By:{
        type: String,
        //required: true
    }
}, {
    versionKey: false 
});


const Doc = mongoose.model('doc', documentSchema);

module.exports = Doc;