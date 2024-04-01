import Joi from "joi";
// Update Driver Schema
const updateDriverSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().min(10).max(10),
    availability: Joi.string().valid("available", "unavailable"),
    vehicleDetails: Joi.string(),
});
const validateUpdateRequest = (req, res, next) => {
    const { error } = updateDriverSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
// Update Vehicle Schema
const updateVehicleSchema = Joi.object({
    manufacturer: Joi.string(),
    model: Joi.string(),
    year: Joi.string().min(4).max(4),
    licensePlate: Joi.string(),
    color: Joi.string(),
    vehicleClass: Joi.string().valid("Bike", "Rickshaw", "mini", "premius", "xl"),
    baseFare: Joi.number(),
});
const validateUpdateVehicle = (req, res, next) => {
    const { error } = updateVehicleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
export { validateUpdateRequest, validateUpdateVehicle };
