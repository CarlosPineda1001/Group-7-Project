const Doc = require('../Models/document_Schema');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const dbURI = 'mongodb+srv://Carlos:XpaZ@mongouploads.zxnhp.mongodb.net/Document_Database?retryWrites=true&w=majority';

// create storage engine
const storage = new GridFsStorage({
    url: dbURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'docs'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage })

const viewPage_index = (req, res) =>{
    Doc.find().sort({ createdAt: -1})
        .then((result) =>{
            res.render('ViewPageDefault', {docs: result});
        })
        .catch((err)=>{
            console.log(err);
        });
}

const viewPage_Post_ImageAndDetails = (upload.single('file'), (req,res) =>{
    const doc = new Doc({
    docu_Group: req.body.docu_Group,
    docu_Type: req.body.docu_Type,
    fileID: req.file.filename
    });

    doc.save()
    .then(result => {
      res.redirect('/ViewPage_Default');
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = {
    viewPage_index,
    viewPage_Post_ImageAndDetails
}