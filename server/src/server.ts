import Fastify, { fastify } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
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

    /* Fastify JWT to tokenize auth */
    await fastify.register(jwt,{
        secret: "2NMe4Ii4lgFm1KsolwDG8ryrqTa4mxGan5WkBq8asNi2LOHmZhOBDEKSxDeIl+n1uI46FE8pwgDyPGt8zNZP8rPmBPrF2LEX+sWLQS7rx0N9RbEQfV4vsrmpQbtTOPSsOPOtDr47CosB17NqhSxGq/C5bu+1yUBuKUIVnOl4UksMldIuee4+Gqg5kJYFKVMK9zvzX3gx8nIDY+s26nwk/VgYddCzasFTQnD6A==",
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