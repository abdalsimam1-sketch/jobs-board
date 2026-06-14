const Joi = require("joi");

const validateEnv = () => {
  const schema = Joi.object({
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_LIFETIME: Joi.string().required(),
  }).unknown(true);
  const { error } = schema.validate(process.env);
  if (error) {
    console.log(`Missing env variable : ${error.message}`);
    process.exit(1);
  }
};

module.exports = validateEnv;
