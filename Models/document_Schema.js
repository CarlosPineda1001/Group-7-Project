const mongoose = require('mongoose');
const schema = mongoose.Schema;
//template of the document files


const DocumentSchema =  new Schema({
    file_ID:{
        type: int,
        required: true
    },
    file_Name:{
        type: String,
        required: true
    },
    docu_Group:{
        type: String,
        required: true
    },
    docu_Type:{
        type: String,
        required: true
    },
    date_Exp:{
        type: Date,
        required: true
    },
    date_Issued:{
        type: Date,
        required: true
    },
    date_Created:{
        type: Date,
        required: true
    },
    date_Lmodified:{
        type: Date,
        required: true
    },
    modded_by:{
        type: String,
        required: true
    },
    created_By:{
        type: String,
        required: true
    }
});


const Doc = mongoose.model('Doc', documentSchema);

module.export = Doc;