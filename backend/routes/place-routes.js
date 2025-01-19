const express = require('express');
const  placesControllers = require("../controller/places-controller")

const router = express.Router()




// Places Routes
router.get('/:pid',placesControllers.getPlaceById )

router.get('/user/:uid',placesControllers.getPlacesByUserId)

router.post('/',placesControllers.createPlace)

router.patch('/:pid',placesControllers.updatePlaceById)
router.delete('/:pid',placesControllers.deletePlaceById)

module.exports = router;
