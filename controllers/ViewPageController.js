const Doc = require('../Models/document_Schema');

const viewPage_index = (req, res) =>{
    
    
    Doc.find().sort({ createdAt: -1})
        .then((result) =>{
            res.render('ViewPageDefault', {docs: result});
        })
        .catch((err)=>{
            console.log(err);
        });
}

const viewPage_Post_ImageAndDetails = (req,res) => {
    const doc = new Doc(req.body);

    doc.save()
    .then(result => {
      res.redirect('/ViewPage_Default');
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
    viewPage_index,
    viewPage_Post_ImageAndDetails
}