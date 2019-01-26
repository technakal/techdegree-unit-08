const express = require('express');
const router = express.Router();

/**
 * Index route redirects to /books route
 */
router.get('/', (req, res) => {
  res.redirect('/books');
});

module.exports = router;
