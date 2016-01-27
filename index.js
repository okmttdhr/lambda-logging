var request = require('superagent');
var Promise = require('bluebird');
var StackTrace = require('stacktrace-js');
var moment = require('moment');

/**
 * post error log to DynamoDB
 * @param {Object} query
 * @return {Object}
 */
function _postLog(endpoint, query) {
  return new Promise(function(resolve, reject) {
    request
      .post(endpoint)
      .send(query)
      .end(function(err, res) {
        if (err) return reject(err);
        return resolve(res.text);
      });
  });
}

/**
 * invoke lambda function to get error log
 */
function logError(endpoint, dbName) {
  window.onerror = function(msg, file, line, col, error) {
    StackTrace
      .fromError(error)
      .then(function(stackframes) {
        const query = {
          tableName: dbName,
          stack: JSON.stringify(stackframes),
          date: moment().format('YYYYMMDDHHmmss'),
        };
        return _postLog(endpoint, query);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}


module.exports = {
  start: logError
};
