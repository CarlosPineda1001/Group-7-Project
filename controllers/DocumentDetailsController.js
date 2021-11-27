const Doc = require('../Models/document_Schema');

const viewDocDetails = (req, res) =>{
    const id = req.params.id;
    Doc.findById(id)
        .then(result => {
            res.render('PreviewDetails', {doc: result});
        });
};

module.exports = {
    viewDocDetails
}