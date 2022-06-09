require("dotenv").config();

import { AppConfiguration } from "./models/configuration/app-configuration";

const configuration: AppConfiguration = {
  db: {
    url: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    type: process.env.DATABASE_ENGINE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
    service: process.env.LOGGER_SERVICE
  },
  server: {
    port: process.env.PORT,
    secret: process.env.JWT_SECRET,
  },
};

export { configuration };
