const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ViewPage_DefaultRoutes = require('./routes/ViewPage_DefaultRoutes');
const Document_DefaultRoutes = require('./routes/Document_DetailsRoutes');

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
const dbURI = 'mongodb+srv://Carlos:XpaZ@mongouploads.zxnhp.mongodb.net/Document_Database?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000, () =>{
            console.log('Server started');
        }); 
    })
    .catch((err) => console.log(err));

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

app.get('/account_details', (req, res) => {
    res.render('AccountDetails');
});

app.get('/NewDocs', (req, res) =>{
    res.render('NewDocsPage');
});

// app.get('/Document_Details/:id', (req, res) =>{
//     const id = req.params.id;
//     Doc.findById(id)
//         .then(result => {
//             res.render('PreviewDetails', {doc: result});
//         });
// });

app.post('/', (req,res)=>{
    let email = req.body.Email;
    let pass = req.body.Password;


    if(email==demo.em && pass==demo.pass){

        res.redirect('/ViewPage_Default');

    }

    if(email==demo2.em && pass==demo2.pass){

        res.redirect('/ViewPage_Default');

    }
   
        Acc.findOne({user_Email: email})
            .then((user)=>{
                if(user.user_Password == pass){
                    
                  //  console.log("email exists!");
                    console.log("nakalogin kana boy");
                   res.redirect('/ViewPage_Default');
                   // if(pass == )
                }else{
                    
            
                      }
            })

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
                    if(confirmPass == pass){
                    console.log(user);
                     account.save()
                             .then((result)=>{
                            console.log(req.body);
                                
                            
                            
                            
                            
                            })
                            .catch((err)=>{
                               console.log(err);
                             })

                            }else{
                                console.log("Passwords do not match")
                            }
            
                      }
            })
});

// route for ViewPage
app.use('/ViewPage_Default', ViewPage_DefaultRoutes);

// route for DocumentDetailPage
app.use('/Document_Details', Document_DefaultRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404');
    //use this function for every request if it reaches this point
    //end of the line, only functions when nothing matched
});