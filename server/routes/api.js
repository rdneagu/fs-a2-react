const express = require('express');
const fs_a2 = require('../lib/fs_a2');

const router = express.Router();

/* GET: /api/test endpoint */
router.get('/test', async (req, res) => {
  console.log(fs_a2.countAllMorningFlights());
  res.json(fs_a2.flights);
});

module.exports = router;
