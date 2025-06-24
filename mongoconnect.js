const mongoose = require('mongoose')
function connectDB(mongourl){
    mongoose.connect(mongourl)
    .then(console.log('mongodb connected'))
    .catch(err=>{console.log('error in connecting mongodb',err)})

}
module.exports = {connectDB}
