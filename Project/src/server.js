const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
  })
  .catch((error) => {
    console.error(error);
  });
