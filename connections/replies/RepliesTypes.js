module.exports = {
    Model: `
    type RepliesModel {
        threadId: ID
        commentId: ID
        commentUserId: ID
        replyUserId: ID
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        replyUserName: String
        replyText: String
    }
    `,
    Mutations: `
    createAReply(threadId: ID, commentId: ID, commentUserId: ID, replyUserId: ID, replyUserName: String, replyText: String): RepliesModel
    ##
    editAReply(replyId: ID, replyUserId: ID, replyText: String): RepliesModel
    ##
    deleteAllReplies(replyUserId: ID): RepliesModel
    ##
    deleteAReply(replyId: ID, replyUserId: ID): RepliesModel
    `,
    Queries: `
    viewAllReplies: [RepliesModel]
    ##
    viewASingleReplyById(replyId: ID): RepliesModel
    `
}