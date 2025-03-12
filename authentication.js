const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
app.post('/student', (req, res)=>{
    const {username, password} = req.body;
    const token = jwt.sign({username, password} ,"cvrcollege");
    if(username == "raghuram" && password == "123cvr"){
        res.status(200).json({token});
    }
    else{
        res.status(400).json({message: "Invalid credentials"});
    }
});

app.get('/protected', authenticateToken, (req, res)=>{
    res.status(200).json({"message": "Welocme to My Home Page"});
});


app.get('/students' , (req, res)=>{
    res.status(200).json({"message":"Here is a list of students"});
});


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(token, "cvrcollege", (err, decoded)=>{
        if(err){
            return res.status(403).json({message: "Forbidden"});
        }
        else{
            res.status(200).json({"message":decoded});
            next();
        }
    });
}

app.listen(3000, () => {
  console.log('Server started at port 3000');
});