const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.KEY
function setuser(user){

   return jwt.sign({
    id: user._id,
    name:user.name
   },key)
}
function getuser(token){
    if(!token)return null
   
    try{
        return jwt.verify(token, key)

    }catch(err){
        console.log("error in verifing token",err)
    }
}
module.exports = {setuser, getuser}