const express = require('express');
const jwt = require('jsonwebtoken');

// Express App Init
const app = express();

// GET API endpoint
app.get('/', (req,res)=>{
    res.json({
      message : 'API endpoint'
    });
});

// Endpoint which is to be secured
app.post('/post',verifyToken,(req,res)=>{
    // Token Verifier
    jwt.verify(req.token,'secret', (err,auth_Data)=>{
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message : 'Token verified succesfully',
                decoded : auth_Data
            });
        }
    });
});

// Method to verify the token
function verifyToken(req,res,next){

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
      // Create an array with the token as the second element
      const bearer_array = bearerHeader.split(' ');
      // Set the value of the token as the second element of the array
      req.token = bearer_array[1];
      // Middleware part
      next();
    }
    else {
        res.sendStatus(403);
    }
}

// Token Generating POST
app.post('/login', (req,res)=>{

    // Dummy User
      const user = {
          id : 1,
          name : 'yadnesh',
          email : 'yadnesh@gmail.com'
      }

    // JWT sign method
    jwt.sign({user:user},'secret',{expiresIn : '30s'}, (err,token)=>{
        if (err) {
            console.log(err);
        }
        else {
            res.json({token:token});
        }
    });
});

// Server Init
app.listen(3000, ()=>{
    console.log('Server up at port 3000');
})
