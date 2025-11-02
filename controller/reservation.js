import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js"; // ✅ imported correctly

export const sendReservation = async (req, res, next) => {

  const { firstName, lastName, email, phone, date, time } = req.body;

  // ✅ Basic validation
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill the full reservation form!", 400));
  }

  try {
    // ✅ Properly create document
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });

    res.status(200).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    // ✅ Handle validation errors properly
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    // Catch-all for other errors
    return next(new ErrorHandler("Something went wrong!", 500));
  }
};
