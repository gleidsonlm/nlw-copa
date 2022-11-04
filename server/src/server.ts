import Fastify, { fastify } from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './lib/prisma';
import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { gameRoutes } from './routes/game';
import { authRoutes } from './routes/auth';


async function bootstrap() {
    /* starting Fastify server with prettyPrint logger */
    const fastify = Fastify({
        logger: true,
    })
    
    /* Fastify Cors register all origin in dev env. */
    await fastify.register(cors, {
        origin: true,
    })

    /* Routes */
    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(authRoutes)

    /* listen on port 3333 */
    await fastify.listen({
        port: 3333,
        /*host: '0.0.0.0'*/
    })
}

bootstrap();