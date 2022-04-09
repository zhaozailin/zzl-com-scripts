if (process.env.NODE_ENV === 'development') {
  module.exports = require('./main.js');
} else {
  module.exports = require('./main.min.js');
}
