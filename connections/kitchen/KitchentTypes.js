module.exports = {
    Model: `
    type KitchenModel {
        _id: ID
        kitchenUserId: String
        kitchenBackdropTheme: String
        kitchenDashboardTheme: String
        kitchenFontColor: String
        actionBarButtonsTheme: String
        totalPantries: Float
        totalPantryItems: Float
        totalPantryItemsCost: Float
    }
    `,
    Mutations: `
    editKitchen(kitchenId: ID, totalPantries: Float, totalPantryItems: Float, totalPantryItemsCost: Float): KitchenModel
    editKitchenThemeSettings(kitchenId: ID, kitchenBackdropTheme: String, kitchenDashboardTheme: String, actionBarButtonsTheme: String, kitchenFontColor: String): KitchenModel
    ##
    `,
    Queries: `
    viewMyKitchen(kitchenUserId: ID): KitchenModel
    `
}