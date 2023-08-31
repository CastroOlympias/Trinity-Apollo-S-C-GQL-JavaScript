const { Schema, model } = require('mongoose');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

const pantryItemsSchema = new Schema(
    {
        // Source Document Pantry Data
        pantryId: {
            type: String
        },
        // Context User Data
        pantryItemUserId: {
            type: String
        },
        // Document Pantry Item Data
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
        pantryItemStore: {
            type: String
        },
        pantryItemBrand: {
            type: String
        },
        pantryItemName: {
            type: String
        },
        pantryItemPackageDescription: {
            type: String
        },
        pantryItemPackageCost: {
            type: Number
        },
        pantryItemPackageQuantity: {
            type: Number
        },
        pantryItemPackageGrossWeightOunces: {
            type: Number
        },
        pantryItemPackageNetWeightOunces: {
            type: Number
        },
        pantryItemPackageServingsQuantity: {
            type: Number
        },
        pantryItemPackagePiecesPerServing: {
            type: Number
        },
        pantryItemProteinsPerServingGrams: {
            type: Number
        },
        pantryItemFatsPerServingGrams: {
            type: Number
        },
        pantryItemCarbsPerServingGrams: {
            type: Number
        },
        pantryItemNotes: {
            type: String
        },
        pantryItemImageFileName: {
            type: String
        },
        pantryItemImageFileSize: {
            type: Number
        },
        pantryItemImageFileLocation: {
            type: String,
        },
        pantryItemImage_s3bucketImageKey_Name: {
            type: String,
            default: 'use place holder'
        },
        pantryItemsImages: [{
            type: Schema.Types.ObjectId,
            ref: 'ImagesModel'
        }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)

const PantryItemsModel = model('PantryItemsModel', pantryItemsSchema)
module.exports = PantryItemsModel;