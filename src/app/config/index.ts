import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_SECRET: string;
  JWT_EXPIRES: string;
  SALT: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
}

const loadEnvironments = (): EnvConfig => {
  const requireEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_SECRET",
    "JWT_EXPIRES",
    "SALT",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
  ];

  requireEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variables: ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES: process.env.JWT_EXPIRES as string,
    SALT: process.env.SALT as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export const config = loadEnvironments();
