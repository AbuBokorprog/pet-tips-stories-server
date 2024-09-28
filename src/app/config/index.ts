import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: `${process.env.MONGODB_URL}`,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASS,
  salt: process.env.SALT,
  access_secret: process.env.JWT_ACCESS_SECRET,
  access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
};
