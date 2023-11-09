import * as Joi from 'joi';
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  PORT: Joi.number().default(3001),
  MONGO_DB: Joi.string().required(),
  EMAIL_PORT: Joi.number().default(587),
  STMP_HOST: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
});
