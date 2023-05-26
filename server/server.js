const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the correct MIME type for CSS files
app.get('*.css', (req, res, next) => {
  res.contentType('text/css');
  next();
});

// Set the correct MIME type for JavaScript files
app.get('*.js', (req, res, next) => {
  res.contentType('application/javascript');
  next();
});

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});