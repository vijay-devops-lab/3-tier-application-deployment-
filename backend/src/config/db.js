import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables before creating Sequelize instance
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'buildco',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');
    await sequelize.sync();
  } catch (error) {
    console.log('MySQL connection error:', error.message);
    process.exit(1);
  }
};

export default sequelize;
