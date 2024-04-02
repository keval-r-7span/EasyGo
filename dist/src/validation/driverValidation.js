import Joi from "joi";
const driverJoiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    availability: Joi.string().valid("available", "unavailable"),
    role: Joi.string().default("driver"),
});
const validateRequest = (req, res, next) => {
    const { error } = driverJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
const addVehicleSchema = Joi.object({
    manufacturer: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.string().min(4).max(4).required(),
    licensePlate: Joi.string().required(),
    color: Joi.string(),
    vehicleClass: Joi.string()
        .valid("Bike", "Rickshaw", "mini", "premius", "xl")
        .required(),
    baseFare: Joi.number().required(),
    driverId: Joi.string().required(),
});
const validateAddVehicle = (req, res, next) => {
    const { error } = addVehicleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
export { validateRequest, validateAddVehicle };
