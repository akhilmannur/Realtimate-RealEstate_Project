import Joi from "@hapi/joi";

export const joiUservalidationSchema = Joi.object({
  name: Joi.string(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z0-9])(?=.*[@#$%^&+=!])([A-Za-z0-9@#$%^&+=!]{8,30})$"))
    .required(),
});

export const joiUserLoginvalidationSchema = Joi.object({

  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z0-9])(?=.*[@#$%^&+=!])([A-Za-z0-9@#$%^&+=!]{8,30})$"))
    .required(),
});

