const express = require('express');
const router = express.Router();

const { isProduction } = require('../../config/keys');

/* GET csrf listing. */
if (!isProduction) {
  router.get('/restore', function(req, res) {
    const csrfToken = req.csrfToken();
    res.status(200).json({
      'CSRF-Token': csrfToken
    });
  });
}

module.exports = router;
