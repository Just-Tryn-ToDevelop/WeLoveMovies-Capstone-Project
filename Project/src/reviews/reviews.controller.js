const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await reviewsService.readReview(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function updateReview(req, res, next) {
  const critic = res.locals.review.review_id
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.updateReview(updatedReview);
  res.json({ data: await reviewsService.readReview(critic)});
}

async function deleteReview(req, res) {
  const { review } = res.locals;
  await reviewsService.deleteReview(review.review_id);
  res.status(204).send("204 No Content");
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(updateReview)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(deleteReview)],
};
