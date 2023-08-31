const { UserModel, CommentsModel, RepliesModel } = require('../../collections');
const { AuthenticationError } = require('@apollo/server')

const commentReplyResolvers = {
    // Mutations
    createAReply: async (parent, args, context) => {
        if (context.user) {
            const addAReply = await RepliesModel.create({ ...args, replyUserId: context.user._id, replyUserName: context.user.userName, })
            await CommentsModel.findByIdAndUpdate(
                { _id: args.commentId },
                { $push: { userReplies: addAReply } },
                { new: true },
            );
            return addAReply;
        }
        throw new AuthenticationError('This needs to work for replies');
    },
    editAReply: async (parent, args, context) => {
        if (args.replyUserId == context.user._id) {
            const editAReply = await RepliesModel.findOneAndUpdate(
                { _id: args.replyId },
                args,
                { new: true }
            );
            return editAReply;
        }
        throw new AuthenticationError("You can't edit another user's comment");
    },
    deleteAllReplies: async (parent, args, context) => {
        if (args.replyUserId == context.user._id) {
            const allReplies = await RepliesModel.deleteMany({
                replyUserId: args.replyUserId
            });
            await CommentsModel.findOneAndUpdate(
                { replyUserId: args.replyUserId },
                { $pull: { userReplies: allReplies.replyUserId } },
                { new: true }
            );

            return allReplies
        }
        throw new AuthenticationError("You cannot delete all of your replies for some reason")
    },
    deleteAReply: async (parent, args, context) => {
        if (args.replyUserId == context.user._id) {
            const replyText = await RepliesModel.findOneAndDelete({
                _id: args.replyId
            });
            await CommentsModel.findByIdAndUpdate(
                { _id: args.replyId },
                { $pull: { userReplies: replyText.replyId } },
                { new: true }
            );
            return replyText;
        }
        throw new AuthenticationError("You can't delete another user's comment")
    },

    // Queries
    viewAllReplies: async (parent) => {
        return RepliesModel.find().sort({ createdAt: 'desc' });
    },
    viewASingleReplyById: async (parent, { replyId }) => {
        return RepliesModel.findOne({ replyId });
    }
}

module.exports = commentReplyResolvers;