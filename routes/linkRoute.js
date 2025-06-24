const express = require('express')
const linkModel = require('../models/Link_model')
const { redirectLink, addLink, linkDetailsJson } = require('../controllers/linkcontroller')
const {checkAuthentication} = require('../middlewares/checkAuth')
const route = express.Router()

route.get('/',checkAuthentication, (req, res) => {
    const count = 0
    res.send("hello user")
    console.log(count + 1)
})

route.get('/all',checkAuthentication, async (req, res) => {
    try {
        const allLinks = await linkModel.find({});
        res.render('allLinks', { links: allLinks });
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

route.get('/:project', redirectLink)

route.get('/:project/data',linkDetailsJson )

route.post('/postData',addLink )

route.get('/details/:project', async (req, res) => {
    const { project } = req.params;
    const linkData = await linkModel.findOne({ projectName: project });
    if (!linkData) {
        return res.status(404).send('Project not found');
    }
    res.render('clickDetails', { projectName: linkData.projectName, clicks: linkData.clicks });
});


module.exports = route