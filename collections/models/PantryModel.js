const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const pantrySchema = new Schema(
    {
        // Context User Data
        pantryUserId: {
            type: String
        },
        pantryUserName: {
            type: String
        },
        // Document Pantry Data
        UTCCreatedAtFullDateAndTime: {
            type: Date,
            default: Date.now,
            get: UTCFullDateAndTIme => UTCDateFormatter(UTCFullDateAndTIme)[0]
        },
        UTCCreatedAtTime: {
            type: Date,
            default: Date.now,
            get: time => UTCDateFormatter(time)[1]
        },
        UTCCreatedAtDate: {
            type: Date,
            default: Date.now,
            get: date => UTCDateFormatter(date)[2]
        },
        UTCCreatedAtMonth: {
            type: Date,
            default: Date.now,
            get: UTCMonth => UTCDateFormatter(UTCMonth)[3]
        },
        UTCCreatedAtYear: {
            type: Date,
            default: Date.now,
            get: UTCYear => UTCDateFormatter(UTCYear)[4]
        },
        pantryType: {
            type: String,
            minlength: 0,
            maxlength: [72, 'You entered too many characters to add a note']
        },
        pantryNotes: {
            type: String,
            minlength: 0,
            maxlength: [120, 'You entered too many characters to add a note']
        },
        // Relational Document Data
        pantryItems: [{
            type: Schema.Types.ObjectId,
            ref: 'PantryItemsModel'
        }],
        pantryItemsTotalQuantity: {
            type: Number,
            default: 0
        },
        pantryItemsTotalCost: {
            type: Number,
            default: 0
        },
        pantryCommentThread: [{
            type: Schema.Types.ObjectId,
            ref: 'CommentsModel'
        }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)

const PantryModel = model('PantryModel', pantrySchema)
module.exports = PantryModel;