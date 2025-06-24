const express = require('express')
const linkModel = require('../models/Link_model')
const { redirectLink, addLink, addlinkget } = require('../controllers/linkcontroller')
const {checkAuthentication} = require('../middlewares/checkAuth')
const router = express.Router()



router.get('/',checkAuthentication, async (req, res) => {
    try {
        const allLinks = await linkModel.find({});
        res.render('allLinks', { links: allLinks });
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

router.get('/:project', redirectLink)

router.route('/api/addlink',checkAuthentication,).post( addLink).get(addlinkget)

router.get('/details/:project',checkAuthentication ,async (req, res) => {
    const { project } = req.params;
    const linkData = await linkModel.findOne({ projectName: project });
    if (!linkData) {
        return res.status(404).send('Project not found');
    }
    res.render('clickDetails', { projectName: linkData.projectName, clicks: linkData.clicks });
});


module.exports = router