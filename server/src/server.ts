import Fastify, { fastify } from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
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
    //(pt-br: enquete | bolão)
    
    // GET /pools/count return the number of pools 
    fastify.get('/pools/count', async() => { 
        const count = await prisma.pool.count();
        return { count }
    });

    // GET /users/count return the number of users 
    fastify.get('/users/count', async() => { 
        const count = await prisma.user.count();
        return { count }
    });

    // GET /guesses/count return the number of guesses 
    fastify.get('/guesses/count', async() => { 
        const count = await prisma.guess.count();
        return { count }
    });

    // POST /pools adds new pool
    fastify.post('/pools', async(request,reply) => { 
        const createPoolBody = z.object({
            title: z.string(),
        })
        const { title } = createPoolBody.parse(request.body);
        const generate = new ShortUniqueId({length:6});
        const code = String(generate()).toUpperCase();

        // Create pool within database with prisma
        await prisma.pool.create({
            data: {
                title,
                code
            }

        })
        
        return reply.status(201).send({ code })
        });
    

    /* listen on port 3333 */
    await fastify.listen({
        port: 3333,
        /*host: '0.0.0.0'*/
    })
}

bootstrap();
