const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI);
conn.model('Doc', require('./schemas/document_Schema'));
conn.model('Acc', require('../schemas/account_Schema'));

module.exports = conn;
