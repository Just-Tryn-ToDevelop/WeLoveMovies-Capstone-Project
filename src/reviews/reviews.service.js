const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function updateReview(updatedReview) {
  return knex("reviews as r")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "r.*")
    .then((updatedRecords) => updatedRecords[0])
}

function readReview(review_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.*",
      "c.*",
    )
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);
};

function deleteReview(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

module.exports = {
  updateReview,
  readReview,
  deleteReview,
};
