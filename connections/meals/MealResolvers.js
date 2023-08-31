const { UserModel, MealsModel, MealItemsModel, CommentsModel, RepliesModel } = require("../../collections")
const { AuthenticationError } = require('@apollo/server')

const mealResolvers = {
    // Mutations
    createAMeal: async (parent, args, context) => {
        if (context.user) {
            const addNewMeal = await MealsModel.create({ ...args, mealUserId: context.user._id, mealUserName: context.user.userName })
            await UserModel.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { userMeals: addNewMeal } },
                { new: true }
            )
            return addNewMeal;
        }
    },
    editAMeal: async (parent, args, context) => {
        if (args.mealUserId == context.user._id) {
            const updateMeal = await MealsModel.findOneAndUpdate(
                { _id: args.mealId },
                args,
                { new: true }
            );
            return updateMeal;
        }
        throw new AuthenticationError('You need to be logged in to update your meal');
    },
    // Not sure how I can implement this, if you delete this, you can't select your thread comments and replies to beleted only for your Threads, ti will delete all your comemnts to everyone's elses thread too, so don't use it for now. specificially delete the Thread for those spcefic comment and reply deletions based on deleteMany by threadId
    deleteAllMealsAndAllMealItems: async (parent, args, context) => {
        if (context.user._id) {
            const meals = await MealsModel.deleteMany({
                mealUserId: context.user._id
            });
            await MealItemsModel.deleteMany({
                mealItemsUserId: context.user._id
            })
            // await CommentsModel.deleteMany({
            //     commentUserId: context.user._id
            // });
            // await RepliesModel.deleteMany({
            //     replyUserId: context.user._id
            // });
            await UserModel.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { userMeals: meals.mealUserId } },
                { new: true }
            )
            return meals;
        }
        throw new AuthenticationError("You cannot delete another user's meals and items")
    },
    deleteAMealAndAllMealItems: async (parent, args, context) => {
        if (args.mealUserId == context.user._id) {
            const deleteMeal = await MealsModel.findOneAndDelete({
                _id: args.mealId
            });
            await MealItemsModel.deleteMany({
                mealId: args.mealId
            })
            await CommentsModel.deleteMany({
                threadId: args.mealId
            });
            await RepliesModel.deleteMany({
                threadId: args.mealId
            });
            await UserModel.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { userMeals: deleteMeal.mealId } },
                { new: true }
            )
            return deleteMeal;
        }
        throw new AuthenticationError('You must be logged in to delete a meal')
    },

    // Queries
    viewAllMyMeals: async (parent, args, context) => {
        if (context.user._id) {
            return MealsModel.find({ mealUserId: context.user._id }).sort({ mealName: 'asc' })
                .populate('mealItems')
                .populate('mealCommentThread')
        }
        throw new AuthenticationError("You don't have any meals that we can find")
    },
    viewAllMeals: async (parent) => {
        return MealsModel.find().sort({ mealName: 'asc' })
            .populate('mealItems')
            .populate('mealCommentThread')
    },
    viewAllMealsBySameName: async (parent, { mealName }) => {
        return MealsModel.find({ mealName }).sort({ createdAt: 'asc' })
            .populate('mealItems')
            .populate('mealCommentThread')
    },
    viewASingleMealById: async (parent, { mealId }) => {
        return MealsModel.findOne({ mealId })
            .populate('mealItems')
            .populate('mealCommentThread')
    },
}
module.exports = mealResolvers;