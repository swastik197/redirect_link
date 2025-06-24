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
        const date = new Date();

        const indiaTime = date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
        });
        await linkModel.updateOne(
            { _id: linkData._id },
            {
                $push: {
                    clicks: {
                        time: indiaTime,
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
        const linkData = await linkModel.findOne({ link })
        if (!linkData) {
            const newLink = await linkModel.create({
                link, projectName
            })
            const generatedLink = `${req.protocol}://${req.get('host')}/${newLink.projectName}`;
            res.render('addlink', {
                success: 'Link generated successfully!',
                generatedLink,
                error: null
            })
        } else {
            res.render('addlink', {
                error: 'This link already exists!',
                success: null,
                generatedLink: null
            })
        }
    } catch (err) {
        console.error("Error in saving the link", err)
        res.render('addlink', {
            error: 'Internal server error',
            success: null,
            generatedLink: null
        })
    }
}

function addlinkget(req, res) {
    res.render('addlink', { error: null, success: null, generatedLink: null });
}

async function jsonDetails(req, res) {
    try {
        const { project } = req.params;
        const linkData = await linkModel.findOne({ projectName: project });
        if (!linkData) {
            return res.status(404).send('Project not found');
        }
        res.json({ linkData })
    } catch (err) { res.send("unable to find json data", err) }

}
async function linkDetails(req, res) {
    try {
        const { project } = req.params;
        const linkData = await linkModel.findOne({ projectName: project });
        if (!linkData) {
            return res.status(404).send('Project not found');
        }
        res.render('clickDetails', { projectName: linkData.projectName, clicks: linkData.clicks });
    } catch (err) { res.send("unable to find  data", err) }

}
async function getallLinks(req, res) {
    try {
        const allLinks = await linkModel.find({});
        res.render('allLinks', { links: allLinks });
    } catch (err) { res.status(500).send('Error fetching data'); }

}

module.exports = { redirectLink, addLink, addlinkget, jsonDetails, linkDetails, getallLinks }





