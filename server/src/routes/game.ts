import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';
import { nullable, z } from 'zod';
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

        // find the user guess (or null) on a game, in this pool.
        const games = await prisma.game.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                guesses: {
                    where: {
                        participant: {
                            poolId: id,
                            userId: request.user.sub,    
                        }
                    }   
                }  
            }
        });

        return {
            games: games.map(game => {
                return {
                    ...game,
                    // excluding guesses array with all users guesses
                    guesses: undefined,
                    // including the only guess of the authenticated user, or null.
                    guess: game.guesses.length > 0 ? game.guesses[0] : null,
                }
            })
        }
    });
};