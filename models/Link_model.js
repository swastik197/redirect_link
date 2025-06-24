const mongoose = require('mongoose')

const clickSchema = new mongoose.Schema({
    // time: { type: Date, default: Date.now },
    time:String,
    ip: String,
    userAgent: String,
    language: String,
    timezone: String,
    referrer: String,
    device: {
        browser: String,
        os: String,
        platform: String,
        isMobile: Boolean
    },
    utm: {
        source: String,
        medium: String,
        campaign: String,
        term: String,
        content: String
    }
});
const linkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    clicks: [clickSchema]
})
const linkModel = new mongoose.model("linkSchema", linkSchema)

module.exports = linkModel