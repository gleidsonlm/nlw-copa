import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function guessRoutes(fastify: FastifyInstance){
    // GET /guesses/count return the number of guesses 
    fastify.get('/guesses/count', async() => { 
        const count = await prisma.guess.count();
        return { count }
    });
};