import "dotenv/config";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
});

export default AppDataSource;
