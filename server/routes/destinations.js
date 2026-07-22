import express from 'express'
import DestinationController from '../controllers/destinations.js'

// initialize the router
const router = express.Router()

// define the routes
router.get('/', DestinationController.getDestinations)
router.get('/:id', DestinationController.getDestination)
router.post('/', DestinationController.createDestination)
router.patch('/:id', DestinationController.updateDestination)
router.delete('/:id', DestinationController.deleteDestination)

export default router