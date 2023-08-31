module.exports = {
    Model: `
    type MacroDashboardModel {
        macroDashboardUserId: ID
        macroDashboardUserName: String
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        sealsTaxRate: Float
        monthDays: Float
        dailyCost: Float
        monthlyCost: Float
        dailyMealOunces: Float
        dailyCalories: Float
        macroProteinsRatio: Float
        macroFatsRatio: Float
        macroCarbsRatio: Float
        suggestedProtensGrams: Float
        suggestedFatsGrams: Float
        suggestedCarbsGrams: Float
        actualProteinsGrams: Float
        actualFatsGrams: Float
        actualCarbsGrams: Float
        selectedMeals: [MealsModel]
    }
    `,
    Mutations: `

    `,
    Queries: `

    `
}