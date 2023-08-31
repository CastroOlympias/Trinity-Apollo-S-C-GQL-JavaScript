module.exports = {
    Model: `
    type UserModel {
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        eMail: String
        userName: String
        password: String
        birthDate: String
        renderActionBar: Boolean
        useGlobalTheme: Boolean
        highEfficiencyRenderring: Boolean
        hideScrollTrackerDisplayBox: Boolean
        aboutMe: String
        findMeFriend: String
        userMacroDashboard: [MacroDashboardModel]
        userHome: [HomeModel]
        userKitchen: [KitchenModel]
        userGym: [GymModel]
        userPantry: [PantryModel]
        userMeals: [MealsModel]
        userComments: [CommentsModel]
        friends: [UserModel]
        blocked: [UserModel]
    }
    `,
    Mutations: `
    createAUser(userName: String, eMail: String, birthDate: String, password: String): Auth
    ##
    loginToAUser(eMail: String, password: String): Auth
    ##
    editAUser(userName: String, eMail: String, birthDate: String, password: String, aboutMe: String, findMeFriend: String): UserModel
    ##
    changeAUsereMailOrPassword(userName: String, eMail: String, password: String): Auth
    ##
    editUserThemeSettings(_id: ID, renderActionBar: Boolean, useGlobalTheme: Boolean,highEfficiencyRenderring: Boolean, hideScrollTrackerDisplayBox: Boolean): UserModel
    ##
    editRenderringType(_id: ID, highEfficiencyRenderring: Boolean, hideScrollTrackerDisplayBox: Boolean): UserModel
    ##
    deleteAUser(userId: ID): UserModel
    ##
    deleteAllUsers: UserModel
    ##
    friendAUser(friendId: ID): UserModel
    ##
    blockAUser(blockedId: ID): UserModel
    `,
    Queries: `
    findMyIdAndName: UserModel
    ##
    findMe(_id: ID): UserModel
    ##
    findMySettings(_id: ID): UserModel
    ##
    findAllUsers: [UserModel]
    ##
    findAllUsersBySameName(userName: String): [UserModel]
    ##
    findAllUsersBySecretCode(findMeFriend: String): [UserModel]
    ##
    findAUserById(userId: ID): UserModel
    ##
    findAUserByEmail(eMail: String): UserModel
    `
}