const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await moviesService.readMovie(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res) {
  const showing = req.query.is_showing;
  const moviesShowing = await moviesService.moviesShowingList()
  moviesShowing.splice(15)
   !showing ? res.json({data: await moviesService.allMoviesList()}) : res.json({data: moviesShowing})

}

function readMovie(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function listTheatersPlayingMovie(req, res) {
  const {movie} = res.locals
  const data = await moviesService.listTheatersPlayingMovie(movie.movie_id);
  res.json({ data });
}

async function listReviewsForMovie(req, res) {
  const movieId = req.params.movieId
  const data = await moviesService.listReviewsForMovie(movieId)
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), readMovie],
  listTheatersPlayingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersPlayingMovie),
  ],
  listReviewsForMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviewsForMovie),
  ],
};
