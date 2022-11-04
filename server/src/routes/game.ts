import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate } from '../plugins/authenticate';

export async function gameRoutes(fastify: FastifyInstance){
    // GET /pools/:id/games return user guesses in the pools.
    fastify.get('/pools/:id/games',
        { onRequest: [authenticate] },
        async (request, reply) => {
        
        // validate request params
        const getPoolParams = z.object({ id: z.string() });
        // parse request parameters to validate function    
        const { id } = getPoolParams.parse(request.params);

        const games = await prisma.game.findMany({
            where: {}
        });
    });
};