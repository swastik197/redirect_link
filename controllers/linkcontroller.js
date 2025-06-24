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

async function linkDetailsJson(req, res) {
    try {
        const { project } = req.params
        const linkData = await linkModel.findOne({ projectName: project })
        if (!linkData) {
            return res.status(404).send('Project not found');
        }
   
        
        res.json({ linkData})
    } catch (err) {
        console.error("Error in fetching link details", err)
        res.error("internal server error", err)
    }
}


module.exports = { redirectLink, addLink, linkDetailsJson }





