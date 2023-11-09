export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  MONGO_DB: process.env.MONGO_DB,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});

export const emailSenderConfiguration = () => ({
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  CLIENTEID: process.env.CLIENTEID,
  CLIENTESECRET: process.env.CLIENTESECRET,
  REFRESH_TOKEN_GMAIL: process.env.REFRESH_TOKEN_GMAIL,
  HOST: process.env.STMP_HOST,
});
