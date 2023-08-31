const { Schema, model } = require('mongoose')
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const imagesSchema = new Schema({
    UTCCreatedAtFullDateAndTime: {
        type: Date,
        default: Date.now,
        get: UTCFullDateAndTIme => UTCDateFormatter(UTCFullDateAndTIme)[0]
    },
    UTCCreatedAtTime: {
        type: Date,
        default: Date.now,
        get: time => UTCDateFormatter(time)[0]
    },
    UTCCreatedAtDate: {
        type: Date,
        default: Date.now,
        get: date => UTCDateFormatter(date)[1]
    },
    UTCCreatedAtMonth: {
        type: Date,
        default: Date.now,
        get: UTCMonth => UTCDateFormatter(UTCMonth)[2]
    },
    UTCCreatedAtYear: {
        type: Date,
        default: Date.now,
        get: UTCYear => UTCDateFormatter(UTCYear)[3]
    },
    imagesUserId: {
        type: String
    },
    imagesSourceId: {
        type: String
    },
    imagesType: {
        type: String
    },
    imagesSize: {
        type: Number
    },
    imagesFileName: {
        type: String
    },
    imagesLocation: {
        type: String,
        default: 'https://user-images-5cc7d775-7ccd-4afc-afe9-040818cf6f0a.s3.us-east-2.amazonaws.com/default_camera2.jpg'
    },
    s3bucketImageKey_Name: {
        type: String,
        default: 'Default Image'
    },
    imagesRawData: {
        type: String
    }
})

const ImagesModel = model('ImagesModel', imagesSchema)
module.exports = ImagesModel