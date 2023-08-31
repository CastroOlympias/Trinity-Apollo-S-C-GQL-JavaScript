const { UserModel, MealsModel, MealItemsModel } = require('../../collections')
const { AuthenticationError } = require('@apollo/server')

const mealItemsResolvers = {
    // Mutations
    createAMealItem: async (parent, args, context) => {
        if (context.user) {
            const addMealItem = await MealItemsModel.create({ ...args, mealItemUserId: context.user._id })
            await MealsModel.findByIdAndUpdate(
                { _id: args.mealId },
                { $push: { mealItems: addMealItem } },
                { new: true }
            )
            return addMealItem
        }
        throw new AuthenticationError('You cannot create a meal item or add it to a meal');
    },
    editAMealItem: async (parent, args, context) => {
        if (args.mealItemUserId == context.user._id) {
            const updateMealItem = await MealItemsModel.findOneAndUpdate(
                { _id: args.mealItemId },
                args,
                { new: true },
            );
            return updateMealItem
        }
        throw new AuthenticationError("You cannot edit another user's Meal item")
    },
    deleteAMealItem: async (parent, args, context) => {
        if (args.mealItemUserId == context.user._id) {
            const deleteMealItem = await MealItemsModel.findOneAndDelete({
                _id: args.mealItemId
            })
            await MealsModel.findByIdAndUpdate(
                { _id: args.mealItemId },
                { $pull: { mealItems: deleteMealItem.mealItemId } },
                { new: true }
            )
            return deleteMealItem;
        }
        throw new AuthenticationError("You cannot delete another user's Meal Item")
    },
    // Queries
    viewAllMyMealItems: async (parent, args, context) => {
        if (context.user) {
            return MealItemsModel.find({ mealItemUserId: context.user._id })
        }
        throw new AuthenticationError("You don't have any meals that we can find")
    },
    viewAllMealItems: async (parent) => {
        return MealItemsModel.find()
    },
}

module.exports = mealItemsResolvers;