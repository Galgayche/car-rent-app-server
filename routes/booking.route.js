const { Router } = require('express');
const { bookingController } = require('../controllers/booking.controller');

const router = Router();
router.get('/booking', bookingController.getBooks);
router.post('/booking', bookingController.addBook);
router.post('/booking/check', bookingController.checkReserved);
router.delete('/booking/:id', bookingController.deleteBook);
// router.patch('/car/:id', carsController.editCar);

module.exports = router;
