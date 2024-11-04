import { Router } from 'express';

const UserRouter = Router();

UserRouter.post('/users/register', (req, res) => {});
UserRouter.post('/users/login', (req, res) => {});

export default UserRouter;