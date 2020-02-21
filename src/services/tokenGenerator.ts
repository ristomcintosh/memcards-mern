import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default (userId: string) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET || '');
  return token;
};
