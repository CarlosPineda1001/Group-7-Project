const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

//import controllers
const ViewPageController = require('../controllers/ViewPageController');

const router = express.Router();

let datab = mongoose.connection;

datab.once('open', () => {
    gfs = Grid(datab.db, mongoose.mongo);
    gfs.collection('docs');
})

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
          const filename = buf.toString('hex');
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

router.get('/', ViewPageController.viewPage_index);
router.post('/',upload.single('file'),ViewPageController.viewPage_Post_ImageAndDetails);
router.get('/document/:filename', ViewPageController.viewPage_image);

module.exports = router;