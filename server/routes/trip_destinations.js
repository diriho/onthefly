import express from 'express'
import TripDestinationController from '../controllers/trip_destinations.js'

// initialize the router
const router = express.Router()

// define the routes
router.get('/', TripDestinationController.getTripsDestinations)
router.get('/trips/:trip_id', TripDestinationController.getAllDestinationsByTrip)
router.get('/destinations/:destination_id', TripDestinationController.getAllTripsByDestination)
router.post('/', TripDestinationController.createTripDestination)


export default router
