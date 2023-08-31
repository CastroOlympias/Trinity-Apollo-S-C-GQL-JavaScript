module.exports = {
    Model: `
    type MealsModel {
        mealUserId: ID
        mealUserName: String
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        mealName: String
        mealQuantity: Float
        mealCost: Float
        mealNotes: String
        mealItems: [MealItemsModel]
        mealCommentThread: [CommentsModel]
    }
    `,
    Mutations: `
    createAMeal(mealUserId: ID, mealUserName: String, mealName: String, mealQuantity: Float, mealCost: Float, mealNotes: String): MealsModel
    ##
    editAMeal(mealId: ID, mealUserId: ID, mealName: String mealQuantity: Float, mealCost: Float, mealNotes: String): MealsModel
    ##
    deleteAllMealsAndAllMealItems: MealsModel
    ##
    deleteAMealAndAllMealItems(mealId: ID, mealUserId: ID): MealsModel
    `,
    Queries: `
    viewAllMeals: [MealsModel]
    ##
    viewAllMyMeals: [MealsModel]
    
    viewAllMealsBySameName(mealName: String): [MealsModel]
    ##
    viewASingleMealById(mealId: ID): MealsModel
    `
}