import { UserOutput } from '../user.types';

declare global {
  namespace Express {
    interface Request {
      user?: UserOutput;
    }
  }
}