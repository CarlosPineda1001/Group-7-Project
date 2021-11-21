const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const Doc = require('./Models/document_Schema');


//express app
//instance of express app
const app = express();

const demo ={em: "marcelusandrei@gmail.com", 
                 pass: "gangplank"};

let demo2 = [];
//register view engine
const name = 'Macky';
app.set('view engine', 'ejs');

//middleware

app.use(express.static('css'));
app.use(express.urlencoded({extended: true})); //used for accepting form data
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// connect to mongodb
const dbURI = 'mongodb+srv://Carlos:XpaZ@mongouploads.zxnhp.mongodb.net/Document_Database?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000, () =>{
            console.log('Server started');
        }); 
    })
    .catch((err) => console.log(err));

let datab = mongoose.connection;

// Init gfs
let gfs;

datab.once('open', () => {
    gfs = Grid(datab.db, mongoose.mongo);
    gfs.collection('docs');
})



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


//lsten to what page
app.get('/', (req, res) =>{
   
    res.render('Loginpage', {title: name});
});

app.get('/register', (req, res) =>{

    res.render('Register');
});

app.get('/Login_Page', (req, res) =>{

   res.render('Loginpage');
});

app.get('/account_details', (req, res) =>{

    res.render('AccountDetails');
 });


// doc routes
app.get('/ViewPage_Default', (req,res)=>{
    Doc.find().sort({ createdAt: -1})
        .then((result) =>{
            res.render('ViewPageDefault', {docs: result});
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/NewDocs', (req, res) =>{
   
    res.render('NewDocsPage');
    
});

app.post('/ViewPage_Default',upload.single('file'), (req,res)=>{
    const doc = new Doc(req.body);

    doc.save()
    .then(result => {
      res.redirect('/ViewPage_Default');
    })
    .catch(err => {
      console.log(err);
    });

    
});

app.get('/Document_Details/:id', (req, res) =>{
    const id = req.params.id;
    Doc.findById(id)
        .then(result => {
            res.render('PreviewDetails', {doc: result});
        });
});

app.post('/', (req,res)=>{
    let email = req.body.Email;
    let pass = req.body.Password;


    if(email==demo.em && pass==demo.pass){

        res.redirect('/ViewPage_Default');

    }

    if(email==demo2.em && pass==demo2.pass){

        res.redirect('/ViewPage_Default');

    }
   

    console.log(email);
    console.log(pass);

});


app.post('/register', (req,res)=>{

    let email = req.body.New_Email;
    
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    
    let pass = req.body.NewPassword1;
    let confirmPass = req.body.NewPassword2;


    if(email==demo.em && pass==demo.pass){

       console.log("Account already exists");

    }else{

        if(pass == confirmPass){

            demo2 = {   em: email, 
                         pass: pass
            }

        }

        //res.redirect('/register');

    }
   

    console.log(email);
    console.log(pass);
    console.log(firstName);
    console.log(lastName);

    console.log (demo2);
  // const log = new Login(req.body);
   // req.
});



//404 page
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404');
    //use this function for every request if it reaches this point
    //end of the line, only functions when nothing matched
});

