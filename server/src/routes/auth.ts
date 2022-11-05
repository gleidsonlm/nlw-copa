import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { authenticate } from '../plugins/authenticate';
import axios from 'axios';

export async function authRoutes(fastify: FastifyInstance){

    fastify.get('/me',
        { onRequest: [authenticate] },
        async (request) => {
            await request.jwtVerify()
            return { user: request.user };
        }
    )

    fastify.post('/users', async(request) => {
        const createUserBody = z.object({
            access_token: z.string(),
        })
        const { access_token } = createUserBody.parse(request.body)
        
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
        const userData = await userResponse.data;

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        })
        const userInfo = userInfoSchema.parse(userData);
        console.log(userInfo);

        let user = await prisma.user.findUnique({
            where : { googleId: userInfo.id, }
        })

        if(!user){
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture,
                }
            })
        }

        const token = fastify.jwt.sign(
            {
            name: user.name,
            email: user.email,
            },{
                sub: user.id,
                expiresIn: '7 days'
            }
        )
            
        return { token }
    })
}