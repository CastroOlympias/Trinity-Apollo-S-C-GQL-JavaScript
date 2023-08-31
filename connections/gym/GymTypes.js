module.exports = {
    Model: `
    type GymModel {
        _id: ID
        gymUserId: String
        gymBackdropTheme: String
        gymDashboardTheme: String
        gymFontColor: String
        actionBarButtonsTheme: String
    }
    `,
    Mutations: `
    editGym(gymId: ID, totalPantries: Int, totalPantryItems: Int, totalPantryItemsCost: Float): GymModel
    editGymThemeSettings(gymId: ID, gymBackdropTheme: String, gymDashboardTheme: String, actionBarButtonsTheme: String, gymFontColor: String): GymModel
    ##
    `,
    Queries: `
    viewMyGym(gymUserId: ID): GymModel
    `
}