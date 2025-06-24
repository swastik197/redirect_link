const {getuser} = require('../services/authservice')
const authModel = require('../models/auth_model')



async function checkAuthentication(req, res, next){
    
// const userToken = req.headers['authorizatioin']
// if(!userToken) return res.send("no userToken found")
//     const token = userToken.split('Bearer ')[1]
// if(!token) return res.send("no token found")
// const user = getuser(token)
// req.user = user
// next()
try {
        const token = req.cookies.token
        if (!token) return res.redirect('/auth/login')
        
        const verifiedToken = getuser(token)
        if (!verifiedToken) return res.redirect('/auth/login')
        
        const user = await authModel.findById(verifiedToken.id)
        if (!user) return res.redirect('/auth/login')
        
        req.user = user;
        next()
    } catch (error) {
        console.error('Token verification error:', error)
        res.redirect('/auth/login')
    }
}
module.exports = {checkAuthentication}