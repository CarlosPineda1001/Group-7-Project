const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    //this callback runs everytime a request is made
    //req -> request
    //res -> response
   // console.log(req.url, req.method);

   //lodash
   const num = _.random(0,20); //random num between 0 and 20
    console.log(num);

    const greet = _.once(() =>{
        console.log('Hello');
    });

    greet();
    greet();

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'Login_Page.html';//adds Loginpage html to path
            res.statusCode = 200;
            break;

        case '/Login_Page':
            path += 'Login_Page.html';//adds Loginpage html to path
            res.statusCode = 200;
            break;       

        case '/register':
            path += 'register.html'; //same thing 
            res.statusCode = 200;
            break;

        case '/register-now':
           
            res.statusCode = 301;
            res.setHeader('Location', '/register');
            res.end();
             break;

        default:
            path += '404.html'; //error page
            res.statusCode = 404;
            break;    
        
    }  
     //send an html file
   //err => argument for error
   //data => data to be sent from server 

    fs.readFile(path, (err,data)=>{

        if (err){
            console.log("ERROR");
            res.end();
        }else{
           // res.write(data);
            
            res.end(data);

        }
    })

});

server.listen(3000, 'localhost', () =>{
    //this callback function fires when we start listening 
    //for the request

    console.log('listening for requests on port 3000')
});
