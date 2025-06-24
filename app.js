const express = require('express')
const useragent = require('express-useragent');
const app = express()
var path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");

const linkRoute = require('./routes/linkRoute')
const authroute = require('./routes/authRoute')
const {connectDB} = require('./mongoconnect')

dotenv.config();
connectDB(process.env.MONGO_URI)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(useragent.express());

app.use('/',linkRoute)
app.use('/auth', authroute)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));