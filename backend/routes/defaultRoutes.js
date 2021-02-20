const express = require('express');
const router = express.Router();
const Poll = require('../model/postModel').Poll;

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

router.get('/' , (req,res) => {
    res.redirect('/vote');
})
router.get('/vote' , (req,res) => {
    res.render('default/vote');
})
router.post('/' , (req,res) => {
    name = req.body.name; 
    voting_choice= req.body.voting_choice;
    casted_at= req.body.casted_at;
    if(isValidDate(casted_at) && isValidBoolean(voting_choice)){
        const newData = new Poll({
            name:name , 
            voting_choice: voting_choice,
            casted_at: casted_at
        });
        if(!req.body.name){
            res.redirect('/')
        }else{
            newData.save().then(data => {
                res.send(JSON.stringify(data))
            })
        }
    }else{
        res.json({error: 'Bad name'});
    }
    
})
router.get('/data' , (req,res) => {
    Poll.find()
        .lean()
        .then(data=>{
            res.send(JSON.stringify(data));
            //res.render('default/data' , {data:data})
        })
})
module.exports = router;