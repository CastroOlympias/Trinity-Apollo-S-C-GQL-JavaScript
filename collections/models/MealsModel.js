const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const MealsSchema = new Schema(
    {
        // Context User Data
        mealUserId: {
            type: String
        },
        mealUserName: {
            type: String
        },
        // Document Meals Data
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
        mealName: {
            type: String
        },
        mealQuantity: {
            type: Number
        },
        mealCost: {
            type: Number
        },
        mealProteins: {
            type: Number
        },
        mealFats: {
            type: Number
        },
        mealCarbs: {
            type: Number
        },
        mealNotes: {
            type: String
        },
        // Relational Document Data
        mealItems: [{
            type: Schema.Types.ObjectId,
            ref: 'MealItemsModel'
        }],
        mealCommentThread: [{
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
);

const MealsModel = model('MealsModel', MealsSchema)
module.exports = MealsModel;