const express = require('express');
const reviewRouter = require('./reviewsRouter');
const authController = require('../controllers/authenticationController');
// const reviewController = require('../controllers/reviewsController');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  setParameter,
  getTourStats,
  getTheBusyMonth,
  getAttractionWithIn,
  getDistances,
} = require('../controllers/tourController');

const router = express.Router();
// router.param('id', checkId);
// router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/top-5-tours').get(setParameter, getAllTours);
router.route('/get-tour-stats').get(getTourStats);
router
  .route('/get-busy-month/:year')
  .get(
    authController.control,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    getTheBusyMonth,
  );
router
  .route('/get-attraction-with-in/:latlong/distance/:maxDistance')
  .get(getAttractionWithIn);
router.route('/get-distances/:latlong').get(getDistances);
router
  .route('/')
  .get(getAllTours)
  .post(
    authController.control,
    authController.restrictTo('admin', 'lead-guide'),
    createTour,
  );
//!i guess this is for the admin and lead-guide only
router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.control,
    authController.restrictTo('admin', 'lead-guide'),
    updateTour,
  )
  .delete(
    authController.control,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );
//! Advance express mounting the router
router.use('/:tourId/reviews', reviewRouter);
module.exports = router;
