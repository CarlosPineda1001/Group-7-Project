const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const session = require('express-session');
const axios = require('axios');

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


const date = new Date(Date.now());

const dateMonth = date.toString().slice(4,7);

switch(dateMonth){
    case 'Jan' : dateMonthNew = '01';
    break;
    case 'Feb' : dateMonthNew = '02';
    break;
    case 'Mar' : dateMonthNew = '03';
    break;
    case 'Apr' : dateMonthNew = '04';
    break;
    case 'May' : dateMonthNew = '05';
    break;
    case 'Jun' : dateMonthNew = '06';
    break;
    case 'Jul' : dateMonthNew = '07';
    break;
    case 'Aug' : dateMonthNew = '08';
    break;
    case 'Sep' : dateMonthNew = '09';
    break;
    case 'Oct' : dateMonthNew = '10';
    break;
    case 'Nov' : dateMonthNew = '11';
    break;
    case 'Dec' : dateMonthNew = '12';
    break;
}

const dateDay = date.toString().slice(8,10);

const dateYear = date.toString().slice(11,15);

const dateNow = dateMonthNew + "/" + dateDay + "/" + dateYear;


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
          const alias = file.originalname;
          const fileInfo = {
            filename: filename, 
            metadata:  alias,
            bucketName: 'docs'
           
          };

          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({ storage })


//profile img storage engine
const imgStorage = new GridFsStorage({
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
            bucketName: 'accs'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const imgUpload = multer({ imgStorage })
//lsten to what page
app.get('/register',requireAdmin, (req, res) =>{
    if(logged_in){

        res.render('Register', {title: "Registration"});
    }
    else{
        res.redirect('/');
    }

});

function requireAdmin (req, res, next) {
    const user_Role = userRole;
    console.log(user_Role);
      if (user_Role == true) {
        next();
      } else {
        res.redirect('/');
      }
  };

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

        res.render('AccountDetails',{firstName: userFirstName, lastName: userLastName, email: email, title: "Account Details"} );//
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

        res.render('NewDocsPage', {title: "New Document"});
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
                    userNow = user.l_Name + ", " + user.f_Name;
                    userFirstName = user.f_Name;
                    userLastName = user.l_Name;
                    password = user.user_Password;
                    userRole = user.user_Role;

                   //console.log(userFirstName + " " + userLastName);
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
    let filenames = [];
    req.files.forEach((file, index)=>{
        
        fileIDs[index]=file.filename
         return fileIDs;
     })
    req.files.forEach((file, index)=>{
        
        filenames[index]=file.metadata
         return filenames;
     })
    const doc = new Doc({
        
        docu_Group: req.body.docu_Group,
        docu_Type: req.body.docu_Type,
        file_ID: fileIDs,
        file_Name: filenames,
        created_By: userNow,
        modified_By: userNow
       
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
            res.render('PreviewDetails', {doc: result, title: "Document Details"});
        });
});

//add attach files
app.post('/Document_Details/:id', upload.single('attch_file'), (req, res, next) =>{
    const id = req.params.id;
    const file = req.body.file_name;

    
    console.log('here');

    if(file == undefined){
        Doc.findByIdAndUpdate(id,{
            date_Lmodified: dateNow,
            modified_By: userNow,
            $push: {
                file_ID: req.file.filename,
                file_Name: req.file.metadata
            }
            
        },(err, result)=>{
            if(err){
                res.send(err)
            }
            else{
                res.redirect('back');
            }
    
        })
    }else{
        console.log(file);
        Doc.findByIdAndUpdate(id,{
        
        $pull: {file_Name: file}
        
        })
    }
});
//details
// axios.put('/Document_Details/:id',)
//     .then((res)=>{
//         console.log(req.params.id)
//     })
//     .catch(err => {
//         console.log(err);
//     });

// app.post('/Document_Details/61ab03401db0f116d88c2c36', (req, res) =>{
//     const id = req.params.id;
//     const file = req.body.file_name;

//     console.log("Hello");
//     Doc.findByIdAndUpdate(id,{
        
//         $pull: {file_Name: file}
        
//     },(err, result)=>{
//         if(err){
//             res.send(err)
//         }
//         else{
            
//             res.redirect('back');
//         }

//     })
// });


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
            user_Role: false
            
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
                      //res.redirect('/register');//
                      })
});

// route for ViewPage
app.use('/ViewPage_Default', ViewPage_DefaultRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404');
    //use this function for every request if it reaches this point
    //end of the line, only functions when nothing matched
});