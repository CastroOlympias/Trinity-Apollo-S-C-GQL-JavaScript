module.exports = {
    Model: `
    type HomeModel {
        _id: ID
        homeUserId: String
        homeBackdropTheme: String
        homeDashboardTheme: String
        homeFontColor: String
        actionBarButtonsTheme: String
    }
    `,
    Mutations: `
    editHome(homeId: ID, totalPantries: Int, totalPantryItems: Int, totalPantryItemsCost: Float): HomeModel
    editHomeThemeSettings(homeId: ID, homeBackdropTheme: String, homeDashboardTheme: String, actionBarButtonsTheme: String, homeFontColor: String): HomeModel
    ##
    `,
    Queries: `
    viewMyHome(homeUserId: ID): HomeModel
    `
}