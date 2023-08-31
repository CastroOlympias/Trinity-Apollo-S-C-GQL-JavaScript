const { UserModel, CommentsModel, RepliesModel, repliesSchema, PantryModel, MealsModel } = require('../../collections');
const { AuthenticationError } = require('@apollo/server')

const commentResolvers = {
    // Mutations
    createACommentThread: async (parent, args, context) => {
        if (context.user) {
            if (args.threadType == "Meals") {
                const addACommentToAMeal = await CommentsModel.create({ ...args, commentUserId: context.user._id, commentUserName: context.user.userName })
                await MealsModel.findByIdAndUpdate(
                    { _id: args.threadId },
                    { $push: { mealCommentThread: addACommentToAMeal } },
                    { new: true }
                );
                return addACommentToAMeal;
            };
            if (args.threadType == "Pantry") {
                const addACommentToAPantry = await CommentsModel.create({ ...args, commentUserId: context.user._id, commentUserName: context.user.userName })
                await PantryModel.findByIdAndUpdate(
                    { _id: args.threadId },
                    { $push: { pantryCommentThread: addACommentToAPantry } },
                    { new: true }
                );
                return addACommentToAPantry;
            };
        }
        throw new AuthenticationError('Match the expected impurt to prevent this error for the thread type');
    },
    editAComment: async (parent, args, context) => {
        if (args.commentUserId == context.user._id) {
            const singleComment = await CommentsModel.findOneAndUpdate(
                { _id: args.commentId },
                args,
                { new: true }
            );
            return singleComment;
        }
        throw new AuthenticationError("You can't edit another user's comment");
    },
    deleteAllCommentsAndAllUserReplies: async (parent, args, context) => {
        if (context.user._id) {
            const commentText = await CommentsModel.deleteMany({
                commentUserId: context.user._id
            });
            await RepliesModel.deleteMany({
                replyUserId: context.user._id
            });
            await RepliesModel.deleteMany({
                commentUserId: context.user._id
            });
            await UserModel.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { userComments: commentText.commentUserId } },
                { new: true }
            );
            return commentText;
        };
        throw new AuthenticationError("You cannot delete another users comments and replies")
    },
    deleteACommentAndAllUserReplies: async (parent, args, context) => {
        if (args.commentUserId == context.user._id) {
            const commentText = await CommentsModel.findOneAndDelete({
                _id: args.commentId
            });
            await RepliesModel.deleteMany({
                commentId: args.commentId
            });
            await UserModel.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { userComments: commentText.commentId } },
                { new: true }
            );
            return commentText;
        }
        throw new AuthenticationError("You can't delete another user's comments and all those replies")
    },
    // This is the userReplies Schema to keep practicing, edit and delete of those replies
    createAReplyToAComment: async (parent, { commentId, replyText }, context) => {
        if (context.user._id) {
            const addAReply = await CommentsModel.findOneAndUpdate(
                { _id: commentId },
                { $push: { userRepliesSchema: { replyUserId: context.user._id, replyUserName: context.user.userName, replyText } } },
                { new: true }
            )
            return addAReply;
        }
        throw new AuthenticationError('You must be logged in to leave a reply');
    },
    editAReplyToAComment: async (parent, args, context) => {
        if (context.user._id) {
            const replyToComment = await CommentsModel.findOneAndUpdate(
                { _id: args.commentId, _id: args.replyId },
                args,
                { new: true }
            );
            return replyToComment;
        };
        throw new AuthenticationError("This reply didn't work");
    },

    // Queries
    viewAllMyComments: async (parent, args, context) => {
        if (context.user) {
            return CommentsModel.find({ commentId: context.user._id })
                .populate('userReplies')
                .populate('userRepliesSchema')
        }
        throw new AuthenticationError("You don't have any comments to view")
    },
    viewAllComments: async (parent) => {
        return CommentsModel.find().sort({ createdAt: 'desc' })
            .populate('userReplies')

    },
    viewASingleCommentById: async (parent, { commentId }) => {
        return CommentsModel.findOne({ commentId })
            .populate('userReplies')

    },
}

module.exports = commentResolvers;