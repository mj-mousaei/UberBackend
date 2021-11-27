const express = require("express");
const router = express.Router();
const TripController = require("../http/controller/TripController");
const Auth = require("../http/middleware/Auth");



router.get('/api/trip/:id',TripController.getTripById);
router.get('/api/trip/passenger/:id',TripController.getPassengerTrips);
router.get('/api/trip/driver/:id',TripController.getDriverTrips);
router.post('/api/trip', TripController.newTrip);
router.put('/api/trip/:id' ,TripController.editTrip);




module.exports = router;