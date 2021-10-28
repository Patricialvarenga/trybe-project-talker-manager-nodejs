const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
//  Para gerar o Token https://qastack.com.br/programming/8855687/secure-random-token-in-node-js e tem no ex 2
// Express: HTTP com Node.js