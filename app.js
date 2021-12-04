const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const session = require('express-session');

const ViewPage_DefaultRoutes = require('./routes/ViewPage_DefaultRoutes');

const Acc = require('./Models/account_Schema');
const Doc = require('./Models/document_Schema');

//express app
//instance of express app
const app = express();
/*
const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                .update('Welcome to Techweber')
                .digest('hex');

console.log(hash);*/


/*const cipher = crypto.createCipher('aes192', 'a password');
var encrypted = cipher.update('Malaki na ba yan?', 'utf8', 'hex');

encrypted = encrypted + cipher.final('hex');
console.log(encrypted);*/

//317c37cbfd2be29b03917f6df9a7cf41

/*
const decipher = crypto.createDecipher('aes192', 'a password')

var decrypted = decipher.update(encrypted,'hex', 'utf8');
decrypted = decrypted + decipher.final('utf8');

console.log(decrypted);

*/


const demo ={em: "marcelusandrei@gmail.com", 
                 pass: "gangplank"};

                 

let logged_in = false;
let userFirstName = "defaultFirstName";
let userLastName = "defaultLastName";
let email = "defaultEmail";
let userID = "defaultID";
let password = "defaultPassword";
let encryptedEmail = "defaultEncryptedEmail";
let loginErrorMessage = " ";


let demo2 = [];
//register view engine
const name = 'Macky';
app.set('view engine', 'ejs');

//middleware

app.use(express.static('css'));
app.use(express.urlencoded({extended: true})); //used for accepting form data
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({secret:"12345ggggg", resave:false, saveUninitialized: true }));


// connect to mongodb
const dbURI = 'mongodb+srv://Carlos:XpaZ@mongouploads.zxnhp.mongodb.net/Document_Database?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(process.env.PORT || 5000, '0.0.0.0', () =>{
            console.log('Server started');
        }); 
    })
    .catch((err) => console.log(err));

let datab = mongoose.connection;

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




//lsten to what page

app.get('/register', (req, res) =>{
    if(logged_in){

        res.render('Register');
    }
    else{
        res.redirect('/');
    }
    
});

app.get('/', (req, res) =>{

    if(logged_in){

        res.redirect('/ViewPage_Default');
    }
    else{
        res.render('Loginpage',{errorMessage: loginErrorMessage});
    }
  
});

app.get('/Loginpage', (req, res) =>{

   logged_in = false;
   loginErrorMessage= " ";
   res.redirect('/');
  
});


app.get('/account_details', (req, res) => {

    if(logged_in){

        res.render('AccountDetails',{firstName: userFirstName, 
                                    lastName: userLastName, 
                                    email: email, 
                                     } );//
    }
    else{
        res.redirect('/');
    }
   
});

app.post('/account_details', (req, res) => {
let oldPassword = req.body.oldPassword;
let newPass1 = req.body.NewPassword1;
let newPass2 = req.body.NewPassword2;

            //ENCRYPT OLD PASS
            const cipher2 = crypto.createCipher('aes192', 'a password');
            var encryptedOldPass = cipher2.update(oldPassword, 'utf8', 'hex');
            encryptedOldPass = encryptedOldPass + cipher2.final('hex');


 if(encryptedOldPass == password){

        if(newPass1 == newPass2){

            
            const cipher2 = crypto.createCipher('aes192', 'a password');
            var encryptedPass = cipher2.update(newPass1, 'utf8', 'hex');
            encryptedPass = encryptedPass + cipher2.final('hex');
        
            console.log(encryptedPass);
        
            
           Acc.findOneAndUpdate({user_Email: encryptedEmail}, {user_Password: encryptedPass },{new:true}, (error,data)=>{
               if(error){
                   console.log(error);
        
               }else{
                   console.log("password has been changed to: "+ data);
                    res.redirect('/account_details');
                }
           })
           
        }else{
            console.log("the passwords do not match.");
           

        }
}else{

    console.log("The password you have entered is incorrect.");
  

}

});

app.get('/NewDocs', (req, res) =>{
   
    if(logged_in){

        res.render('NewDocsPage');
    }
    else{
        res.redirect('/');
    }
   
});

app.post('/', (req,res)=>{
    email = req.body.Email;
    let pass = req.body.Password;
    


    const cipher1 = crypto.createCipher('aes192', 'a password');
    encryptedEmail = cipher1.update(email, 'utf8', 'hex');
    encryptedEmail = encryptedEmail + cipher1.final('hex');
           
 
    const cipher2 = crypto.createCipher('aes192', 'a password');
    var encryptedPass = cipher2.update(pass, 'utf8', 'hex');
    encryptedPass = encryptedPass + cipher2.final('hex');
   
        Acc.findOne({user_Email: encryptedEmail})
            .then((user)=>{
                if(user.user_Password == encryptedPass){
                    
                  //  console.log("email exists!");
                    console.log("nakalogin kana boy");
                    console.log(user);
                    userFirstName = user.f_Name;
                    userLastName = user.l_Name;
                    password = user.user_Password;
                   //console.log(userFirstName + " " + userLastName);
                    userNow = user.l_Name + ", " + user.f_Name;
                   res.redirect('/');
                   // if(pass == )
                   logged_in = true;
                   // req.session.user = user;
                   //console.log("user: "+ req.session.user);
                }else{
                    
                    console.log("Wrong Password");
                    loginErrorMessage = "The username or password you have entered is incorrect ";
                     
                    res.render('Loginpage',{errorMessage: loginErrorMessage} );
                     }
                }
            )
            .catch((err) => console.log("Invalid Credentials")
                            );

    console.log(email);
    console.log(pass);

});

//creation of new document in system
app.post('/ViewPage_Default',upload.array('file',12), (req,res, next)=>{
    //file_ID array
    let fileIDs = [];
    req.files.forEach((file, index)=>{
        
        fileIDs[index]=file.filename
         return fileIDs;
     })
    const doc = new Doc({
        
        docu_Group: req.body.docu_Group,
        docu_Type: req.body.docu_Type,
        file_ID: fileIDs,
        created_By: userNow
       
    });
    doc.save()
    .then(result => {
      res.redirect('/ViewPage_Default');
    })
    .catch(err => {
      console.log(err);
    });
});


//displaying document additional details
app.get('/Document_Details/:id', (req, res) =>{
    const id = req.params.id;

    Doc.findById(id)
        .then(result => {
            res.render('PreviewDetails', {doc: result});
        });
});

//add attach files
app.post('/Document_Details/:id', upload.single('attch_file'), (req, res) =>{
    const id = req.params.id;
    Doc.findByIdAndUpdate(id,{
        attach_FileID: req.file.filename
    },(err, result)=>{

        if(err){
            res.send(err)
        }
        else{
            res.render('PreviewDetails', {doc: result})
        }

    })
});

app.post('/register', (req,res)=>{
            let email = req.body.New_Email;
            
            let firstName = req.body.fname;
            let lastName = req.body.lname;
            
            let pass = req.body.NewPassword1;
            let confirmPass = req.body.NewPassword2;


            const cipher1 = crypto.createCipher('aes192', 'a password');
            var encryptedEmail = cipher1.update(email, 'utf8', 'hex');
            encryptedEmail = encryptedEmail + cipher1.final('hex');
            
            const cipher2 = crypto.createCipher('aes192', 'a password');
            var encryptedPass = cipher2.update(pass, 'utf8', 'hex');
            encryptedPass = encryptedPass + cipher2.final('hex');

        const account = new Acc({
            //user_ID: '00001',
            f_Name: firstName,
            l_Name: lastName,
            user_Email: encryptedEmail,
            user_Password: encryptedPass,
            
        });

            console.log(encryptedEmail);
            console.log(encryptedPass);
            console.log(firstName);
            console.log(lastName);
        
            
        Acc.findOne({user_Email: encryptedEmail})
            .then((user)=>{

             
                //console.log(encrypted);
               // user.user_Email = 

                if(user){
                    //let errors = [];
                   // errors.push({text: 'email already exists'});
                    console.log("email already exists");
                 console.log(user);
                }else{

                    if(confirmPass == pass){
                    console.log(account);

                     account.save()
                             .then((result)=>{
                            //console.log(req.body);                  
                            
                            })
                            .catch((err)=>{
                               console.log(err);
                             })

                            }else{
                                console.log("Passwords do not match")
                            }
            
                      }
                      res.redirect('/register');  })
});

// route for ViewPage
app.use('/ViewPage_Default', ViewPage_DefaultRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404');
    //use this function for every request if it reaches this point
    //end of the line, only functions when nothing matched
});