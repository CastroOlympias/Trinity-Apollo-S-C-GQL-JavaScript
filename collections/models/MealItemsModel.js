const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const mealItemsSchema = new Schema(
    {
        // Source Document Meals Data
        mealId: {
            type: String
        },
        // Context User Data
        mealItemUserId: {
            type: String
        },
        // Document Meal Item Data
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
        mealItemStore: {
            type: String
        },
        mealItemBrand: {
            type: String
        },
        mealItemName: {
            type: String
        },
        mealItemPackageDescription: {
            type: String
        },
        mealItemPackageCost: {
            type: Number
        },
        mealItemPackageQuantity: {
            type: Number
        },
        mealItemPackageGrossWeightOunces: {
            type: Number
        },
        mealItemPackageNetWeightOunces: {
            type: Number
        },
        mealItemPackageServingsQuantity: {
            type: Number
        },
        mealItemPackagePiecesPerServing: {
            type: Number
        },
        mealItemCostPerGrossWeightOunces: {
            type: Number
        },
        mealItemCostPerNetWeightOunces: {
            type: Number
        },
        mealItemProteinsPerServingGrams: {
            type: Number
        },
        mealItemFatsPerServingGrams: {
            type: Number
        },
        mealItemCarbsPerServingGrams: {
            type: Number
        },
        mealItemNotes: {
            type: String
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)

const MealItemsModel = model('MealItemsModel', mealItemsSchema)
module.exports = MealItemsModel;