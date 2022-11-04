import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function guessRoutes(fastify: FastifyInstance){
    // POST /pools/:poolId/games/:gameId/guesses will create a guess related to a game in a given pool.
    fastify.post('/pools/:poolId/games/:gameId/guesses',
        { onRequest : [authenticate] },
        async (request, reply) => {

/*             // validate game exists
            const gameExists = await prisma.game.exists({
                poolId,
                gameId,
            });
*/

            // validate guess route params with zod
            const createGuessParams = z.object({
                poolId: z.string(),
                gameId: z.string(),
            });
            //validate guess body params with zod
            const createGuessBody= z.object({
                firstTeamPoints: z.number(),
                secondTeamPoints: z.number(),
            });
            // parse guess route params to validate
            const { poolId, gameId } = createGuessParams.parse(request.params);
            //parse guess route params to validate
            const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body);

            return {
                poolId,
                gameId,
                firstTeamPoints,
                secondTeamPoints,
            }

        });

    // GET /guesses/count return the number of guesses 
    fastify.get('/guesses/count', async() => { 
        const count = await prisma.guess.count();
        return { count }
    });
};