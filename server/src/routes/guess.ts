import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function guessRoutes(fastify: FastifyInstance){
    // POST /pools/:poolId/games/:gameId/guesses will create a guess related to a game in a given pool.
    fastify.post('/pools/:poolId/games/:gameId/guesses',
        { onRequest : [authenticate] },
        async (request, reply) => {

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

            /* Start validations before creating the guess */
            // participant of the current pool?
            const participant = await prisma.participant.findUnique({
                where: {
                    userId_poolId: {
                        poolId,
                        userId: request.user.sub,
                    }
                }
            })
            // if not a participant, send error message
            if (!participant) {
                return reply.status(400).send({
                    message: 'You are not in this group.'
                })
            }

            // there's already a guess of this participant?
            const guess = await prisma.guess.findUnique({
                where: {
                    participantId_gameId: {
                    participantId: participant.id,
                        gameId
                    }
                }
            })
            if (guess) {
                return reply.status(400).send({
                    message: 'You have already confirmed your prediction.'
                })
            }

            // there's the game and it has not started.
            const game = await prisma.game.findUnique({
                where: { id: gameId },
            })
            if (!game) {
                return reply.status(400).send({
                    message: 'Game not found.'
                })
            } else if (game.date < new Date()) {
                return reply.status(400).send({
                    message: 'You cannot send predictions after the game.'
                })
            }

            // after validations passes, create the guess
            await prisma.guess.create({
                data: {
                    gameId,
                    participantId: participant.id,
                    firstTeamPoints,
                    secondTeamPoints,
                }
            })

            // reply 201 without content
            return reply.status(201).send()

        });

    // GET /guesses/count return the number of guesses 
    fastify.get('/guesses/count', async() => { 
        const count = await prisma.guess.count();
        return { count }
    });
};