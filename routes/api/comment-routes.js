const router = require('express').Router();
const {
  getCommentById,
  addComment,
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId')

  .post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

router.route('/:id')
  .get(getCommentById)

module.exports = router;
