module.exports = {
    Model: `
    type PantryItemsModel {
        pantryId: ID
        pantryItemUserId: ID
        UTCCreatedAtFullDateAndTime: String
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        pantryItemStore: String
        pantryItemBrand: String
        pantryItemName: String
        pantryItemPackageDescription: String
        pantryItemPackageCost: Float
        pantryItemPackageQuantity: Float
        pantryItemPackageGrossWeightOunces: Float
        pantryItemPackageNetWeightOunces: Float
        pantryItemPackageServingsQuantity: Float
        pantryItemPackagePiecesPerServing: Float
        pantryItemProteinsPerServingGrams: Float
        pantryItemFatsPerServingGrams: Float
        pantryItemCarbsPerServingGrams: Float
        pantryItemNotes: String
        pantryItemImageFileName: String
        pantryItemImageFileSize: Float
        pantryItemImageFileLocation: String
        pantryItemImage_s3bucketImageKey_Name: String
        pantryItemsImages: [ImagesModel]
    }
    `,
    Mutations: `
    createAPantryItem(pantryId: ID, pantryItemUserId: ID, pantryItemStore: String, pantryItemBrand: String, pantryItemName: String, pantryItemPackageDescription: String, pantryItemPackageCost: Float, pantryItemPackageQuantity: Float, pantryItemPackageGrossWeightOunces: Float, pantryItemPackageNetWeightOunces: Float, pantryItemPackageServingsQuantity: Float, pantryItemPackagePiecesPerServing: Float, pantryItemProteinsPerServingGrams: Float, pantryItemFatsPerServingGrams: Float, pantryItemCarbsPerServingGrams: Float, pantryItemNotes: String, pantryItemImageFileName: String, pantryItemImageFileSize: Int, pantryItemImageFileLocation: String, pantryItemImage_s3bucketImageKey_Name: String): PantryItemsModel
    ##
    editAPantryItem(pantryItemId: ID, pantryItemUserId: ID, pantryItemStore: String, pantryItemBrand: String, pantryItemName: String, pantryItemPackageDescription: String, pantryItemPackageCost: Float, pantryItemPackageQuantity: Float, pantryItemPackageGrossWeightOunces: Float, pantryItemPackageNetWeightOunces: Float, pantryItemPackageServingsQuantity: Float, pantryItemPackagePiecesPerServing: Float, pantryItemProteinsPerServingGrams: Float, pantryItemFatsPerServingGrams: Float, pantryItemCarbsPerServingGrams: Float, pantryItemNotes: String): PantryItemsModel
    updatePantryItemImage(pantryItemId: ID, pantryItemUserId: ID, pantryItemImageFileName: String, pantryItemImageFileSize: Float, pantryItemImageFileLocation: String, pantryItemImage_s3bucketImageKey_Name: String): PantryItemsModel
    ##
    movePantryItemToAnotherPantry(pantryItemId: ID, previousPantryId: ID, pantryId: ID, pantryItemUserId: ID): PantryItemsModel
    ##
    deleteAPantryItem(pantryItemId: ID, pantryId: ID, pantryItemUserId: ID, s3bucketImageKey_Name: String): PantryItemsModel
    ##
    deleteAllPantryItems: PantryItemsModel
    `,
    Queries: `
    veiwAllMyPantryItems: [PantryItemsModel]
    ##
    veiwAllPantryItemsFromPantryId(pantryId: String, limit: Float, skip: Float): [PantryItemsModel]
    ##
    viewAllPantryItems(limit: Float, skip: String): [PantryItemsModel]
    ##
    viewASinglePantryItemById(pantryItemId: ID): PantryItemsModel
    `
}