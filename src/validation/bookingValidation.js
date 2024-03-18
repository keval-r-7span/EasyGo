const Joi = require("joi");

const bookingJoiSchema = Joi.object({
  customer:Joi.string(),
  driver:Joi.string(),
  pickupLocation: Joi.string().min(3).max(100).required(),
  dropoffLocation: Joi.string().min(3).max(100).required(),
  pickupTime: Joi.string().required().default(Date.now()),
  status: Joi.string().lowercase(),
  fare: Joi.number().required(),
  rating: Joi.number(),
  payment_status: Joi.string().lowercase(),
  comments: Joi.string(),
});

const validateRequest = (req, res, next) => {
  const { error } = bookingJoiSchema.validate(req.body);
  if (error) {
      return res.status(400).json({error: error.details[0].message});
  }
  next();
};

module.exports = validateRequest;