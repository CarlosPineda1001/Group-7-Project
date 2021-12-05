const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//template of the document files

const date = new Date(Date.now());

const dateMonth = date.toString().slice(4,7);

switch(dateMonth){
    case 'Jan' : dateMonthNew = '01';
    break;
    case 'Feb' : dateMonthNew = '02';
    break;
    case 'Mar' : dateMonthNew = '03';
    break;
    case 'Apr' : dateMonthNew = '04';
    break;
    case 'May' : dateMonthNew = '05';
    break;
    case 'Jun' : dateMonthNew = '06';
    break;
    case 'Jul' : dateMonthNew = '07';
    break;
    case 'Aug' : dateMonthNew = '08';
    break;
    case 'Sep' : dateMonthNew = '09';
    break;
    case 'Oct' : dateMonthNew = '10';
    break;
    case 'Nov' : dateMonthNew = '11';
    break;
    case 'Dec' : dateMonthNew = '12';
    break;
}

const dateDay = date.toString().slice(8,10);

const dateYear = date.toString().slice(11,15);

const dateNow = dateMonthNew + "/" + dateDay + "/" + dateYear;

const documentSchema =  new Schema({
    file_ID:[String],
    file_Name:[String],
    docu_Group:{
        type: String
    },
    docu_Type:{
        type: String
    },
    date_Exp:{
        type: Date
    },
    date_Issued:{
        type: Date
    },
    date_Created:{
        type: String, default: dateNow
    },
    date_Lmodified:{
        type: String, default: dateNow
    },
    modified_By:{
        type: String
    },
    created_By:{
        type: String
    }
}, {
    versionKey: false 
});


const Doc = mongoose.model('doc', documentSchema);

module.exports = Doc;