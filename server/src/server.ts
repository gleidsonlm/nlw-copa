import Fastify, { fastify } from "fastify";
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
    
    /* Routes */
    // GET /pools/count return the number of pools (pt-br: enquete | bolão)
    fastify.get('/pools/count', async() => {
        
        const pools = prisma.pool.findMany({
            where: { code: {startsWith: 'b' } }
        })
        
        return { count: pools }
    });

    /* listen on port 3333 */
    await fastify.listen({ port: 3333 })
}

bootstrap();