const transporter = require("../configs/mailTransport");
const dateFormate = require('../helper/dateFormatter')

const mailForBooking = async (_doc) => {
  if(_doc.status==='accepted'){
    const dateTime = dateFormate(_doc.pickupTime).split(',')
    await transporter.sendMail({
      from: "Ride-ME",
      to: "kevalrabadiya27@gmail.com",
      subject: "Ride-ME🚕",
      text: "Hello world?",
      html: `
      <p>Dear Customer,</p>
      <p>Your taxi booking has been successfully confirmed.</p>
      <p>Booking details:</p>
      <ul>
        <li>Date: ${dateTime[0]}</li>
        <li>Time:${dateTime[1]}</li>
        <li>Pickup Location: ${_doc.pickupLocation}</li>
        <li>Drop-off Location: ${_doc.dropoffLocation}</li>
        <li>Driver Name: John Doe</li>
        <li>Driver Contact: +1234567890</li>
      </ul>
      <p>Thank you for choosing our taxi service. Have a safe journey!</p>
      <p>Best regards,<br>Your Taxi Service Team</p>`,
    });
  }
};

module.exports = mailForBooking;
