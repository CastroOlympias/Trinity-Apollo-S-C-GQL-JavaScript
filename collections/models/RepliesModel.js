const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const repliesSchema = new Schema(
    {
        // Source Document (Thread Identifier) Pantry, Meals etc
        threadId: {
            type: String
        },
        // Source Document Comment Data
        commentId: {
            type: String
        },
        commentUserId: {
            type: String
        },
        // Context User Data
        replyUserId: {
            type: String
        },
        replyUserName: {
            type: String
        },
        // Document Reply Data
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
        replyText: {
            type: String,
            required: 'You must enter text to create a reply',
            minlength: 1,
            maxlength: [320, 'You entered too many caracters to add your reply']
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)

const RepliesModel = model('RepliesModel', repliesSchema)
module.exports = RepliesModel;