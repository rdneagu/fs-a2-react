const express = require('express');
const fs_a2 = require('../lib/fs_a2');

const router = express.Router();

/* GET: /api/test endpoint */
router.get('/test', async (req, res) => {
  res.json(fs_a2.flights);
});

module.exports = router;
