const Joi = require('@hapi/joi');

const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required().messages({
      "string.alphanum": `"Username" darf keine Leerzeichen enthalten`,
      "any.required": `"Username" ist erforderlich`
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": `"Passwort" muss mindestens 6 Zeichen enthalten`,
      "any.required": `"Passwort" ist erforderlich`
    })
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;