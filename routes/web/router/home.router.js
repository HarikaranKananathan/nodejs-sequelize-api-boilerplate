const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

module.exports = router;
