const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pollData = new schema({
    name: {
        type:String,
        required: true , 
      },
      voting_choice: {
        type:String , 
        default: true , 
        required: true
      },
      casted_at: {
         type: String ,
         required: true
       }
    });
    
    module.exports = {Poll: mongoose.model('poll' , pollData)};
    