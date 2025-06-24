const express = require('express')
const linkModel = require('../models/Link_model')
const { redirectLink, addLink, addlinkget, jsonDetails, linkDetails , getallLinks } = require('../controllers/linkcontroller')
const {checkAuthentication} = require('../middlewares/checkAuth')
const router = express.Router()



router.get('/',checkAuthentication, getallLinks);
router.get('/:project/json',checkAuthentication,jsonDetails)
router.get('/:project', redirectLink)

router.route('/api/addlink',checkAuthentication,).post( addLink).get(addlinkget)

router.get('/details/:project',checkAuthentication ,linkDetails  );


module.exports = router