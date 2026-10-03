const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`FH101 ORIGIN API listening on http://localhost:${config.port}`);
});
