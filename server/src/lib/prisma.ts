import { PrismaClient } from '@prisma/client';

/* Logging Prisma on Console */
export const prisma = new PrismaClient({
    log: ['query'],
})