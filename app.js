const express = require('express');



//express app
//instance of express app
const app = express();
//const PORT = process.env.PORT || 3000;




const demo ={em: "marcelusandrei@gmail.com", 
                 pass: "gangplank"};

let demo2 = [];
//register view engine
const name = 'Macky';
app.set('view engine', 'ejs');


//listen for reqs
app.listen(3000);

//mmiddle ware for static files

app.use(express.static('css'));
app.use(express.urlencoded()); //used for accepting form data



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

app.get('/ViewPage_Default', (req, res) =>{
   
    res.render('ViewPageDefault');
});

app.get('/NewDocs', (req, res) =>{
   
    res.render('NewDocsPage');
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

        res.redirect('/');

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

