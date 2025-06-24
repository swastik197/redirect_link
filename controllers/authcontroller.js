const authModel = require('../models/auth_model')
const{setuser} = require('../services/authservice')


function signup(req, res) {
//     const { name, pass } = req.body
//    const newuser = authModel.create({
//         name, pass
//     })
//         .then(() => res.send("user created"))
//         .catch(err => res.send("error in sign up: " + err))
    
//     const token = setuser(newuser)    
//     if(token){
//         res.cookie('token', token)
//         res.send("signup successfull")
//     }else(err=>{res.send("error in signup", err)})



}
async function login(req, res) {

try {
        const { pass } = req.body;

        const user = await authModel.findOne({ pass });

        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        const token = setuser(user);
        if (!token) {
        
            return res.status(500).send("Token generation failed");
        }
            res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400000 // 1 hour
        })

        return res.status(200).send("Login successful");
    } catch (err) {
        return res.status(500).send("Login error: " + err.message);
    }}
module.exports = {
    signup, login
}