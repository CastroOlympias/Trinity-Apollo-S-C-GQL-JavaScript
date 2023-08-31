// User Resolvers
const { createAUser, loginToAUser, editAUser, editUserThemeSettings, editRenderringType, changeAUsereMailOrPassword, deleteAUser, deleteAllUsers, friendAUser, blockAUser, findMyIdAndName, findMe, findMySettings, findAllUsers, findAllUsersBySameName, findAllUsersBySecretCode, findAUserById, findAUserByEmail } = require('./users/UserResolvers')

// Images Resolvers
const { uploadAnImage, viewMyImages, viewMySingleIamge } = require('./images/ImagesResolver')


// User Home Resolvers
const { editHome, editHomeThemeSettings, viewMyHome } = require('./home/HomeResolvers')

// User Kitchen Resolvers
const { editKitchen, editKitchenThemeSettings, viewMyKitchen } = require('./kitchen/KitchenResolvers')

// User Gym Resolvers
const { editGym, editGymThemeSettings, viewMyGym } = require('./gym/GymResolvers')

// Comments Resolvers
const { createACommentThread, editAComment, deleteAllCommentsAndAllUserReplies, deleteACommentAndAllUserReplies, viewAllMyComments, viewAllComments, viewASingleCommentById, createAReplyToAComment, editAReplyToAComment } = require('./comment/CommentResolvers')

// Reply Resolvers
const { createAReply, editAReply, deleteAllReplies, deleteAReply, viewAllReplies, viewASingleReplyById } = require('./replies/ReplyResolvers')

// Pantry Resolvers
const { createAPantry, editAPantry, editAPantryTotals, deleteAllPantriesAndAllPantryItems, deleteAPantryAndAllPantryItems, viewAllMyPantries, viewASinglePantryById, bulkExportPantriesAndItems, exportPantriesAndItems } = require('./pantry/PantryResolvers')

// Pantry Item Resolvers
const { createAPantryItem, editAPantryItem, updatePantryItemImage, movePantryItemToAnotherPantry, deleteAPantryItem, deleteAllPantryItems, veiwAllMyPantryItems, veiwAllPantryItemsFromPantryId, viewAllPantryItems, viewASinglePantryItemById } = require('./pantryItems/PantryItemResolvers')

// Meal Resolvers
const { createAMeal, editAMeal, deleteAllMealsAndAllMealItems, deleteAMealAndAllMealItems, viewAllMyMeals, viewAllMeals, viewAllMealsBySameName, viewASingleMealById } = require('./meals/MealResolvers')

// Meal Items Resolvers
const { createAMealItem, editAMealItem, deleteAMealItem, viewAllMyMealItems, viewAllMealItems } = require('./mealItems/MealItemsResolvers')



const resolvers = {
    Mutation: {
        // User Mutations
        createAUser,
        loginToAUser,
        editAUser,
        editUserThemeSettings,
        editRenderringType,
        changeAUsereMailOrPassword,
        deleteAUser,
        deleteAllUsers,
        friendAUser,
        blockAUser,

        // Images Mutations
        uploadAnImage,

        // User Home Mutations
        editHome,
        editHomeThemeSettings,

        // User Kitchen Mutations
        editKitchen,
        editKitchenThemeSettings,

        // User Gym Mutations
        editGym,
        editGymThemeSettings,

        // Comment Mutations
        createACommentThread,
        editAComment,
        deleteAllCommentsAndAllUserReplies,
        deleteACommentAndAllUserReplies,
        createAReplyToAComment,
        editAReplyToAComment,

        // Reply Mutations
        createAReply,
        editAReply,
        deleteAllReplies,
        deleteAReply,

        // Pantry Mutations
        createAPantry,
        editAPantry,
        editAPantryTotals,
        deleteAllPantriesAndAllPantryItems,
        deleteAPantryAndAllPantryItems,

        // Pantry Item Mutations
        createAPantryItem,
        editAPantryItem,
        updatePantryItemImage,
        movePantryItemToAnotherPantry,
        deleteAPantryItem,
        deleteAllPantryItems,

        // Meal Mutations
        createAMeal,
        editAMeal,
        deleteAllMealsAndAllMealItems,
        deleteAMealAndAllMealItems,

        // Meal Item Mutations
        createAMealItem,
        editAMealItem,
        deleteAMealItem,
    },
    Query: {
        // User Queries
        findMyIdAndName,
        findMe,
        findMySettings,
        findAllUsers,
        findAllUsersBySameName,
        findAllUsersBySecretCode,
        findAUserById,
        findAUserByEmail,

        // Images Queries
        viewMyImages,
        viewMySingleIamge,

        // User Home Queries
        viewMyHome,

        // User Kitchen Queries
        viewMyKitchen,

        // User Gym Queries
        viewMyGym,

        // Comment Queries
        viewAllMyComments,
        viewAllComments,
        viewASingleCommentById,

        // User Reply Queries
        viewAllReplies,
        viewASingleReplyById,

        // Pantry Queries
        viewAllMyPantries,
        viewASinglePantryById,
        bulkExportPantriesAndItems,
        exportPantriesAndItems,

        // Pantry Items Queries
        veiwAllMyPantryItems,
        veiwAllPantryItemsFromPantryId,
        viewAllPantryItems,
        viewASinglePantryItemById,

        // Meal Queries
        viewAllMyMeals,
        viewAllMeals,
        viewAllMealsBySameName,
        viewASingleMealById,

        // Meal Items Queries
        viewAllMyMealItems,
        viewAllMealItems,
    },
}
module.exports = resolvers;