import Fastify, { fastify } from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod'
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

    // POST /pools adds new pool
    fastify.post('/pools', async(request,reply) => { 
        const createPoolBody = z.object({
            title: z.string(),
        })
        const { title } = request.body;
        return reply.status(201).send({ title })
        });
    

    /* listen on port 3333 */
    await fastify.listen({
        port: 3333,
        /*host: '0.0.0.0'*/
    })
}

bootstrap();
