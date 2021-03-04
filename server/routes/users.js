var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  await res.json({text: 'USERS'});
});

module.exports = router;
