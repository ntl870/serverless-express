import { DataSource } from "typeorm";
import { User } from "../entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: [User],
  subscribers: [],
  synchronize: false,
});

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized");
    }
    return AppDataSource;
  } catch (error) {
    console.error("Error during Data Source initialization", error);
    throw error;
  }
};

export default AppDataSource;
