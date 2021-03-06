const path = require('path');

const config = {
  latency: 0,
  user: null,
  cache: 0,
  limit: '50mb',
  port: 0,
  host: '127.0.0.1', // 0.0.0.0 or localhost causes windows tests to fail?

  data: path.join(__dirname, '/data'),
  routes: path.join(__dirname, '/dummy.routes.config.json')
};

module.exports = config;
