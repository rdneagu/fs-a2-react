const express = require('express');
const fs_a2 = require('../lib/fs_a2');

const router = express.Router();

/* GET: /api/getMorningFlights endpoint */
router.get('/getMorningFlights', (req, res) => {
  res.json(fs_a2.countAllMorningFlights());
});

/* GET: /api/getPercentageOfFlights endpoint */
router.get('/getPercentageOfFlights', (req, res) => {
  const { country } = (req.body.country) ? req.body : req.query;
  res.json(fs_a2.getPercentageOfFlights(country));
});

/* GET: /api/getMostPopularDestinations endpoint */
router.get('/getMostPopularDestinations', (req, res) => {
  const { limit } = (req.body.limit) ? req.body : req.query;
  res.json(fs_a2.getMostPopularDestination(limit));
});

/* GET: /api/getAvgJourneyTime endpoint */
router.get('/getAvgJourneyTime', (req, res) => {
  const { departure, destination } = (req.body.departure) ? req.body : req.query;
  res.json(fs_a2.getAvgJourneyTime(departure, destination));
});

/* GET: /api/getNumberOfFlightsPerDay endpoint */
router.get('/getNumberOfFlightsPerDay', (req, res) => {
  const { year, month } = (req.body.year) ? req.body : req.query;
  res.json(fs_a2.getNumberOfFlightsPerDay(year, month));
});

module.exports = router;
