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
        if (!token) return res.status(401).json({ error: "Token not found" })
        
        const verifiedToken = await getuser(token)
        if (!verifiedToken) return res.status(401).json({ error: "Token invalid" })
        
        const user = await authModel.findById(verifiedToken.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        
        next()
    } catch (error) {
        console.error('Token verification error:', error)
        res.status(401).json({ error: "Authentication failed" })
    }
}
module.exports = {checkAuthentication}