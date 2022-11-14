const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("review_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
});

function allMoviesList() {
  return knex("movies as m").select("m.rating", "m.runtime_in_minutes", "m.title");
}

function moviesShowingList() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.rating", "m.runtime_in_minutes", "m.title")
    .where(knex.raw("mt.is_showing = true"));
}

function readMovie(movie_id) {
  return knex("movies").select("*").where({ "movie_id": movie_id }).first();
}

function listTheatersPlayingMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.is_showing": true, "mt.movie_id": movie_id });
}

function listReviewsForMovie(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("c.preferred_name", "c.surname", "c.organization_name", "r.content", "r.score", "r.movie_id", "r.review_id")
    .where({ "r.movie_id": movie_id })
    .then(addCritic);
}

module.exports = {
  allMoviesList,
  moviesShowingList,
  readMovie,
  listTheatersPlayingMovie,
  listReviewsForMovie,
};
