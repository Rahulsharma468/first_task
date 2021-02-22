const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const path = require('path');
const { MONGODBURL , PORT } = require('./config/config');
const Poll = require('./model/postModel').Poll;
const cors = require('cors');
//initializing app
const app = express();

app.use(cors());

function isValidDate(date){
    regex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;
    if(regex.test(date)){
        return true;
    }else{
        return false;
    }
}

function isValidBoolean(val){
    if(val == 'true' || val == 'false'){
        return true;
    }else{
        return false;
    }
}

//configure database
mongoose.connect( MONGODBURL, { useNewUrlParser: true , useUnifiedTopology: true})
.then(response => {
    console.log('Connected To Database');
}).catch(err => {
    console.log('Trouble Connecting To Databse');
})

//configure express
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));

//setup view engine for handlebars
app.engine('handlebars' , hbs({defaultLayout: 'default'}));
app.set('view engine' , 'handlebars');

//setup routes
app.post('/vote' , (req,res) => {
    name1 = req.body.name; 
    voting_choice= req.body.voting_choice;
    casted_at= req.body.casted_at;
    if(isValidDate(casted_at) && isValidBoolean(voting_choice)){
        const newData = new Poll({
            name:name1 , 
            voting_choice: voting_choice,
            casted_at: casted_at
        });
        if(!req.body.name){
            res.redirect('/')
        }else{
            newData.save().then(data => {
                res.status(200).send("All done Poroperly");
            })
        }
    }else{
        res.send("error")
    }
    
})
app.get('/data' , (req,res) => {
    Poll.find()
        .lean()
        .then(data=>{
            res.send(data);
        })
})

//Setup port
app.listen(PORT ,() => {
    console.log("App is running on port: "+PORT);
})
