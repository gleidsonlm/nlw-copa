import Fastify, { fastify } from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from '@prisma/client';

/* Logging Prisma on Console */
const prisma = new PrismaClient({
    log: ['query'],
})

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
    
    // GET /pools/count return the number of pools (pt-br: enquete | bolão)
    fastify.get('/pools/count', async() => { 
    const count = await prisma.pool.count();
    return { count }
    });

    /* listen on port 3333 */
    await fastify.listen({
        port: 3333,
        /*host: '0.0.0.0'*/
    })
}

bootstrap();
