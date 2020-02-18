const express = require('express');

const router = express.Router();

/* GET: /api/test endpoint */
router.get('/test', async (req, res) => {
  res.json({ data: 'test successful' });
});

module.exports = router;
