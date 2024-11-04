import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import UserRouter from './routers/users.router';

const app = express();
const prisma = new PrismaClient();

async function main() {
   await prisma.user.deleteMany();
}

main();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.listen(port);
console.log(`Server is running on port ${port}`);
