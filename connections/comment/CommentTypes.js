module.exports = {
    Model: `
    type CommentsModel {
        threadId: ID
        commentUserId: ID
        commentUserName: String
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        commentText: String
        userReplies: [RepliesModel]
    }
    `,
    Mutations: `
    createACommentThread(threadType: String, threadId: ID, commentUserId: ID, commentUserName: String, commentText: String): CommentsModel
    ##
    editAComment(commentId: ID, commentUserId: ID, commentText: String): CommentsModel
    ##
    deleteAllCommentsAndAllUserReplies: CommentsModel
    ##
    deleteACommentAndAllUserReplies(commentId: ID, commentUserId: ID): CommentsModel
    ##
    #################### This is the userRepliesSchema to keep practicing, edit and delete of those replies ####################
    createAReplyToAComment(commentId: ID, replyUserId: ID, replyUserName: String, replyText: String): CommentsModel
    ##
    editAReplyToAComment(commentId: ID, replyId: ID, replyUserId: ID, replyText: String): CommentsModel
    `,
    Queries: `
    viewAllMyComments: [CommentsModel]
    ##
    viewAllComments: [CommentsModel]
    ##
    viewASingleCommentById(commentId: ID): CommentsModel
    `
}