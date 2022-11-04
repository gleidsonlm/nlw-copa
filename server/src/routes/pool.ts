import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import { PrismaClientRustPanicError } from '@prisma/client/runtime';


export async function poolRoutes(fastify: FastifyInstance){
        // GET /pools/count return the number of pools 
        fastify.get('/pools/count', async() => { 
            const count = await prisma.pool.count();
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
            // let ownerId = null;

            // Validate request for JWT token and create pool
            try {
                await request.jwtVerify();
                await prisma.pool.create({
                    data: {
                        title,
                        code,
                        ownerId: request.user.sub,
                        //creator/owner is automatically a participant
                        participants: {
                            create: {
                                userId: request.user.sub,
                            }
                        }
                    }
                })
            } catch (error) {
                await prisma.pool.create({
                    data: {
                        title,
                        code
                    }
                })
            }
          
            return reply.status(201).send({ code })
        });
}