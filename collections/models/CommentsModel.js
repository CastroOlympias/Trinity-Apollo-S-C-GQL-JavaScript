const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');
const repliesSchema = require('../schemas/RepliesSchema');

const commentsSchema = new Schema(
    {
        // Source Document (Thread Identifier) Pantry, Meals
        threadId: {
            type: String
        },
        // Context User Data
        commentUserId: {
            type: String,
        },
        commentUserName: {
            type: String,
            required: true
        },
        // Document Comment Data
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
        commentText: {
            type: String,
            required: 'You must enter text to create a comment',
            minlength: 1,
            maxlength: [320, 'You entered too many characters to add your comment']
        },
        // Child Document Reply Data
        userReplies: [{
            type: Schema.Types.ObjectId,
            ref: 'RepliesModel'
        }],
        userRepliesSchema: [repliesSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

const CommentsModel = model('CommentsModel', commentsSchema);
module.exports = CommentsModel;