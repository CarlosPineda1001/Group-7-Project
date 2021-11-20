const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const ViewPage_DefaultRoutes = require('./routes/ViewPage_DefaultRoutes');
const Doc = require('./Models/document_Schema');
const Acc = require('./Models/account_Schema');


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

const dbURI = 'mongodb+srv://Marcus:gangplank@mongouploads.zxnhp.mongodb.net/Document_Database?retryWrites=true&w=majority';
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

//lsten to what page

app.get('/add-account', (req,res)=>{

    const account = new Acc({
       //user_ID: '00001',
        f_Name: 'Caitlyn',
        l_Name: "Kiramman",
        user_Email: 'caitk@gmail.com',
        user_Password: 'arcane2021',
        user_ProfileImg_ID: '123'
    });
        account.save()
            .then((result)=>{
             res.send(result)
        })
            .catch((err)=>{
                console.log(err);
            });
        })

        
app.get('/', (req, res) =>{
   
    res.render('Loginpage', {title: name});
});

app.get('/register', (req, res) =>{

    res.render('Register');

});



app.get('/Login_Page', (req, res) =>{

   res.render('Loginpage');
});


// doc routes

app.get('/NewDocs', (req, res) =>{
   
    res.render('NewDocsPage');
    
});

app.get('/Document_Details/:id', (req, res) =>{
    const id = req.params.id;
    Doc.findById(id)
        .then(result => {
            res.render('PreviewDetails', {doc: result});
        });
});

//database object viewpage stuff
app.get('/ViewPage_Default/document/:filename', (req,res)=>{
    //checking if file exists
    gfs.files.findOne({filename:req.params.filename}, (err, files) =>{
        if(!files || files.length == 0){
            return res.status(404).json({
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

        const account = new Acc({
            //user_ID: '00001',
            f_Name: firstName,
            l_Name: lastName,
            user_Email: email,
            user_Password: pass,
            
        });

            console.log(email);
            console.log(pass);
            console.log(firstName);
            console.log(lastName);
        

        Acc.findOne({user_Email: email})
            .then((user)=>{
                if(user){
                    //let errors = [];
                   // errors.push({text: 'email already exists'});
                    console.log("email already exists");
                }else{
                    console.log(user);
                     account.save()
                             .then((result)=>{
                            console.log(req.body);
                
                            res.redirect('/');
            
                            })
                            .catch((err)=>{
                               console.log(err);
                             })
                      }
            })







/*



        let accountCheck = null;
        
        
        
        
        
        
        
        
        let checkEmail = async (userEmail) => {
            Acc.exists({ user_Email:email })
            .then((result)=>{
            console.log(result);
                return result;
            })     
                }
        
        
        let value = checkEmail(email);
            
            //PATULONG KAY SEAN SA MONGOOSE
            function checker(){
                if(value == false){
                    account.save()
                .then((result)=>{
                    console.log(req.body);
                
                    res.redirect('/');
            
                })
                .catch((err)=>{
                    console.log(err);
                })
                }
                else{
                    console.log(value);
                    console.log("The email you have entered already exists");
                //   console.log(checkEmail(email));
                }
            
            }
            
            setTimeout(function () {
                checker();
            },3000);*/
        /* if(email==demo.em && pass==demo.pass){

            console.log("Account already exists");

            }else{

                if(pass == confirmPass){

                    demo2 = {   em: email, 
                                pass: pass
                    }

                }

                res.redirect('/');

            }
        

            console.log(email);
            console.log(pass);
            console.log(firstName);
            console.log(lastName);

            console.log (demo2);
        // const log = new Login(req.body);
        // req.*/
});

// route for ViewPage
app.use('/ViewPage_Default', ViewPage_DefaultRoutes);

//404 page
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404');
    //use this function for every request if it reaches this point
    //end of the line, only functions when nothing matched
});

