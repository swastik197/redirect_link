const express = require('express')
const linkModel = require('../models/Link_model')

async function redirectLink(req, res) {
    try {
        const { project } = req.params
        const ip = req.ip;
        const userAgent = req.headers["user-agent"];
        const linkData = await linkModel.findOne({ projectName: project })
        if (!linkData) {
            return res.status(404).send('Project not found');
        }

        const actualLink = linkData.link;
        if (!actualLink) {
            return res.status(404).send('link not found in database')
        }

        await linkModel.updateOne(
            { _id: linkData._id },
            {
                $push: {
                    clicks: {
                        time: new Date(),
                        ip,
                        userAgent,

                        device: {
                            browser: req.useragent.browser,
                            os: req.useragent.os,
                            platform: req.useragent.platform,
                            isMobile: req.useragent.isMobile
                        },

                    }
                }
            }
        ).then((result) => {
            console.log("click data updated successfully", result)
        })
        res.redirect(actualLink)


    } catch (err) {
        console.error("Error in redirectLink", err)
        res.error("internal server error", err)
    }

}
async function addLink(req, res) {
    try {
        const { link, projectName } = req.body
        await linkModel.create({
            link, projectName
        })
        res.send("link saved")
    } catch (err) {
        console.error("Error in saving the link", err)
        res.error("internal server error", err)
    }
}

function addlinkget(req, res) {
   
        res.render('addLink', { error: null });
    
}


module.exports = { redirectLink, addLink, addlinkget }





