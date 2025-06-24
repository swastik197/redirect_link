const { default: mongoose } = require("mongoose");

const authschema = new mongoose.Schema({
    name:{
        type:String
    },
    pass:{
        required:true,
        type:String
    }
})
const authModel = new mongoose.model('authmodel', authschema) 
module.exports = authModel