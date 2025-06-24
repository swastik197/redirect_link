const authModel = require('../models/auth_model')
const{setuser} = require('../services/authservice')


function getLogin(req, res) {
    res.render('login', { error: null });
}


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
            return res.render('login', { error: 'Invalid credentials' });
        }

        const token = setuser(user);
        if (!token) {
        
            return res.render('login', { error: 'Token generation failed' });
        }
            res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400000 // 1 day
        })

        return res.redirect('/all');
    } catch (err) {
        return res.render('login', { error: "Login error: " + err.message });
    }}
module.exports = {
    signup, login, getLogin
}