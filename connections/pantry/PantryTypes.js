module.exports = {
    Model: `
    type PantryModel {
        pantryUserId: ID
        pantryUserName: String
        UTCCreatedAtFullDateAndTime: String
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        pantryType: String
        pantryNotes: String
        pantryItems: [PantryItemsModel]
        pantryItemsTotalQuantity: Float
        pantryItemsTotalCost: Float
        pantryCommentThread: [CommentsModel]
    }
    `,
    Mutations: `
    createAPantry(pantryUserId: ID, pantryUserName: String, pantryType: String, pantryNotes: String): PantryModel
    ##
    editAPantry(pantryId: ID, pantryUserId: ID, pantryType: String, pantryNotes: String): PantryModel
    ##
    editAPantryTotals(pantryId: ID, pantryUserId: ID, pantryItemsTotalQuantity: Float, pantryItemsTotalCost: Float): PantryModel
    ##
    deleteAllPantriesAndAllPantryItems: PantryModel
    ##
    deleteAPantryAndAllPantryItems(pantryId: ID, pantryUserId: ID): PantryModel
    `,
    Queries: `
    viewAllMyPantries(limit: Float, skip: Float): [PantryModel]
    ##
    viewASinglePantryById(pantryId: ID): PantryModel
    ##
    bulkExportPantriesAndItems: [PantryModel]
    ##
    exportPantriesAndItems(pantryId: ID): PantryModel
    `
}