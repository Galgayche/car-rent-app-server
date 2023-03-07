const Booking = require('../models/Booking.model');
const moment = require('moment');

module.exports.bookingController = {
  addBook: async (req, res) => {
    const {
      name,
      _carId,
      fromDate,
      toDate,
      location,
      email,
      tel,
      comment,
      totalPayment,
      totalDays,
    } = req.body;

    try {
      const booking = await Booking.create({
        _carId,
        name,
        fromDate,
        toDate,
        location,
        email,
        tel,
        comment,
        totalPayment,
        totalDays,
      });
      return res.json(booking);
    } catch (error) {
      return res.json({ error: 'Не удалось отправить данные' });
    }
  },

  getBooks: async (req, res) => {
    try {
      const bookings = await Booking.find().populate('_carId', 'name engine payPerDay imageUrl');
      return res.json(bookings);
    } catch (error) {
      return res.json(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Booking.findByIdAndRemove(req.params.id);
      return res.json('Бронь удалена');
    } catch (error) {
      return res.json(error);
    }
  },

  editBook: async (req, res) => {
    try {
      const { name, _carId, fromDate, toDate, location, email, tel, comment } = req.body;

      const book = await Booking.findByIdAndUpdate(
        { id: req.params.id },
        {
          _carId,
          name,
          email,
          tel,
          comment,
          fromDate,
          toDate,
          location,
        }
      );
      res.json(book);
    } catch (error) {
      return res.json(error);
    }
  },

  checkReserved: async (req, res, next) => {
    const { fromDate, toDate, _carId } = req.body;

    const isExist = await Booking.find({ _carId });

    if (isExist.length > 0) {
      const range1Start = moment(fromDate, 'DD-MM-YYYY');
      const range1End = moment(toDate, 'DD-MM-YYYY');

      for (let booking of isExist) {
        const range2Start = moment(booking.fromDate, 'DD-MM-YYYY');
        const range2End = moment(booking.toDate, 'DD-MM-YYYY');

        if (range1Start.isSameOrBefore(range2End) && range1End.isSameOrAfter(range2Start)) {
          return res.json(`Данное авто уже занято с ${booking.fromDate} до ${booking.toDate}`);
        }
      }
    }
    res.send(null);
  },
};
