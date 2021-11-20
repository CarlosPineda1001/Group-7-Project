const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//template of the document files


const documentSchema =  new Schema({
    fileID:{
        type: String
    },
    file_Name:{
        type: String,
        // required: true
    },
    docu_Group:{
        type: String,
        // required: true
    },
    length:{
        type: Number,
        // required: true
    },
    chunkSize:{
        type: Number,
        // required: true
    },
    uploadDate:{
        type: Date,
        // required: true
    },
    contentType:{
        type: String,
        // required: true
    },
    // docu_Type:{
    //     type: String,
    //     required: true
    // },
    // date_Exp:{
    //     type: Date,
    //     required: true
    // }
    // date_Issued:{
    //     type: Date,
    //     required: true
    // },
    // date_Created:{
    //     type: Date,
    //     required: true
    // },
    // date_Lmodified:{
    //     type: Date,
    //     required: true
    // },
    // modded_by:{
    //     type: String,
    //     required: true
    // },
    // created_By:{
    //     type: String,
    //     required: true
    // }
});


const Doc = mongoose.model('docs.file', documentSchema);

module.exports = Doc;