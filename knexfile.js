import dotenv from "dotenv";
dotenv.config();

const shared = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    ssl: { rejectUnauthorized: false },
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: "_knex_migrations",
    directory: "./migrations",
  },
};

export default {
  development: shared,
  production: shared,
};


