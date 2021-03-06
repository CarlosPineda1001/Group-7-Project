const Doc = require('../Models/document_Schema');

const viewPage_index = (req,res)=>{
    Doc.find().sort({ createdAt: -1})
        .then((result) =>{
            res.render('ViewPageDefault', {docs: result, title: "View Files"});
        })
        .catch((err)=>{
            console.log(err);
        });
};

const viewPage_image = (req,res)=>{
    //checking if file exists
    gfs.files.findOne({filename:req.params.filename}, (err, files) =>{
        if(!files || files.length == 0){
            return res.status(err).json({
                err: 'no file'
            });
        }
        //checking if file is an image type
        if(files.contentType=== 'image/jpeg' || files.contentType=== 'image/png'){


            //displaying docs.chunks.data
            const readstream = gfs.createReadStream(files.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({
                err: 'not an image'
            });
        }
    });    
};


module.exports = {
    viewPage_index,
    viewPage_image
}