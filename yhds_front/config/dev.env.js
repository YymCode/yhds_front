'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT:'"http://127.0.0.1:8888"'
  // API_ROOT:'"http://10.0.0.120:8080/alibaba-web/do"'
  // API_ROOT:'"http://stg.sonnynet.com/alibaba-web-stg1/do"'
API_ROOT:'"http://yhds.sonnynet.com/api/do"'
//API_ROOT:'"http://127.0.0.10:8080/alibaba-web/do"'
//API_ROOT:'"http://192.168.124.15:8080/alibaba-web-1.0/do"'
//API_ROOT:'"http://192.168.124.10:8080/alibaba-web/do"'
//API_ROOT:'"http://192.168.124.4:8080/alibaba-web/do"'
//   API_ROOT:'"http://stg1.sonnynet.com/test-api/do"'
//API_ROOT:'"http://192.168.124.23/do"'
});

