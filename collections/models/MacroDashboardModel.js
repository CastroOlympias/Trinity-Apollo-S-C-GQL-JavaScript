const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const macroDashboardSchema = new Schema(
    {
        // Context User Data
        macroDashboardUserId: {
            type: String
        },
        macroDashboardUserName: {
            tupe: String
        },
        // Document Macro Dashboard Data
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
        salesTaxRate: {
            type: Number
        },
        monthDays: {
            type: Number
        },
        dailyCost: {
            type: Number
        },
        monthlyCost: {
            type: Number
        },
        dailyMealOunces: {
            type: Number
        },
        dailyCalories: {
            type: Number
        },
        macroProteinsRatio: {
            type: Number
        },
        macroFatsRatio: {
            type: Number
        },
        macroCarbsRatio: {
            type: Number
        },
        suggestedProteinsGrams: {
            type: Number
        },
        suggestedFatsGrams: {
            type: Number
        },
        suggestedCarbsGrams: {
            type: Number
        },
        actualProteinsGrams: {
            type: Number
        },
        actualFatsGrams: {
            type: Number
        },
        actualCarbsGrams: {
            type: Number
        },
        selectedMeals: [{
            type: Schema.Types.ObjectId,
            ref: 'MealsModel'
        }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)

const MacroDashboardModel = model('MacroDashboardModel', macroDashboardSchema)
module.exports = MacroDashboardModel;