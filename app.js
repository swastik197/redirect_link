const express = require('express')
const useragent = require('express-useragent');
const app = express()
const port = 3000
var path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const linkRoute = require('./routes/linkRoute')
const authroute = require('./routes/authRoute')
const {connectDB} = require('./mongoconnect')


connectDB('mongodb://localhost:27017/link_redirect')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(useragent.express());

app.use('/',linkRoute)
app.use('/auth', authroute)




app.listen(port)