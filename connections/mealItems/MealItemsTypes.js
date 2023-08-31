module.exports = {
    Model: `
    type MealItemsModel {
        mealId: ID
        mealItemUserId: ID
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        mealItemStore: String
        mealItemBrand: String
        mealItemName: String
        mealItemPackageDescription: String
        mealItemPackageCost: Float
        mealItemPackageQuantity: Float
        mealItemPackageGrossWeightOunces: Float
        mealItemPackageNetWeightOunces: Float
        mealItemPackageServingsQuantity: Float
        mealItemPackagePiecesPerServing: Float
        mealItemCostPerGrossWeightOunces: Float
        mealItemCostPerNetWeightOunces: Float
        mealItemProteinsPerServingGrams: Float
        mealItemFatsPerServingGrams: Float
        mealItemCarbsPerServingGrams: Float
        mealItemNotes: String
    }
    `,
    Mutations: `
    createAMealItem(mealId: ID, mealItemUserId: ID, mealItemStore: String, mealItemBrand: String, mealItemName: String, mealItemPackageDescription: String, mealItemPackageCost: Float, mealItemPackageQuantity: Float, mealItemPackageGrossWeightOunces: Float, mealItemPackageNetWeightOunces: Float, mealItemPackageServingsQuantity: Float, mealItemPackagePiecesPerServing: Float, mealItemCostPerGrossWeightOunces: Float, mealItemCostPerNetWeightOunces: Float, mealItemProteinsPerServingGrams: Float, mealItemFatsPerServingGrams: Float, mealItemCarbsPerServingGrams: Float, mealItemNotes: String): MealItemsModel
    ##
    editAMealItem(mealItemId: ID, mealItemUserId: ID, mealItemStore: String, mealItemBrand: String, mealItemName: String, mealItemPackageDescription: String, mealItemPackageCost: Float, mealItemPackageQuantity: Float, mealItemPackageGrossWeightOunces: Float, mealItemPackageNetWeightOunces: Float, mealItemPackageServingsQuantity: Float, mealItemPackagePiecesPerServing: Float, mealItemCostPerGrossWeightOunces: Float, mealItemCostPerNetWeightOunces: Float, mealItemProteinsPerServingGrams: Float, mealItemFatsPerServingGrams: Float, mealItemCarbsPerServingGrams: Float, mealItemNotes: String): MealItemsModel
    ##
    deleteAMealItem(mealItemId: ID, mealItemUserId: ID): MealItemsModel
    `,
    Queries: `
    viewAllMyMealItems: [MealItemsModel]
    ##
    viewAllMealItems: [MealItemsModel]
    `
}