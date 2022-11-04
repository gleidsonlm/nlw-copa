import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import { authenticate } from '../plugins/authenticate';


export async function poolRoutes(fastify: FastifyInstance){
    // GET /pools/:id return info about single pool.
    fastify.get('/pools/:id',
    { onRequest: [authenticate] },
    async (request, reply) => {
        // validate request params
        const getPoolParams = z.object({
            id: z.string(),
        })
        // parse request params
        const { id } = getPoolParams.parse(request.params)
        // select pool info in the db with prisma
        const pool = await prisma.pool.findUnique({
            where: {
                id
            },
            include: {
                // include participants count
                _count: {
                    select: {
                        participants: true
                    }
                },
                // include 4 first participants
                participants: {
                    select: {
                        id: true,
                        // include participant user avatarUrl
                        user: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    }, take: 4,
                },
                // include pool owner info
                owner: {
                    select: {
                        id: true,
                        name: true
                    }
                },                
            }
        })

        return reply.status(200).send( { pool } )

    }
    );

    // GET /pools returns all pools that user logged in is participant
    fastify.get('/pools',
        { onRequest: [authenticate] },
        async (request, reply) => {
        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                        userId: request.user.sub
                    }
                }
            },
            include: {
                // include participants count
                _count: {
                    select: {
                        participants: true
                    }
                },
                // include 4 first participants
                participants: {
                    select: {
                        id: true,
                        // include participant user avatarUrl
                        user: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    }, take: 4,
                },
                // include pool owner info
                owner: {
                    select: {
                        id: true,
                        name: true
                    }
                },                
            }
        })
        reply.send(pools)
    })

    // POST /pools/:id/join validates token and include user as pool participant.
    fastify.post('/pools/join',
    { onRequest: [authenticate] },
    async(request,reply) => {
        const joinPoolBody = z.object({
            code: z.string(),
        })
        const { code } = joinPoolBody.parse(request.body)
        // check if pool exists
        const pool = await prisma.pool.findUnique({
            where: {
                code,
            },
            // check if already a participant
            include: {
                participants: {
                    where: {
                        userId : request.user.sub,
                    }
                }
            }
        })

        if(!pool){
            return reply.code(404).send({
                message: 'Pool not found.'
            })
        }

        // If pool has no owner, first user logged in is owner
        if(!pool.ownerId){
            await prisma.pool.update({
                where: {
                    id: pool.id,
                },
                data: {
                    ownerId: request.user.sub,
                }
            })
        }

        // Add participation in the pool
        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: request.user.sub,
            },
        })

        // Return http code object created
        return reply.status(201).send()

    })

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