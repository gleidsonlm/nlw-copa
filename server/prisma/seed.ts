import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {
    /* To add an user */
    const user = await prisma.user.create({
        data: {
            name: 'Gleidson Medeiros',
            email: 'contact@gleidsonlm.com',
            avatarUrl : 'https://github.com/gleidsonlm'
        }
    })

    /* To add a owned pool */
    const pool = await prisma.pool.create({
        data: {
            title: 'BigHead SuperBetGroup',
            code: 'bighead',
            ownerId: user.id,
        
        /* Using Prisma connect to create the participant as well */
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    /* To add a participant
    const participant = await prisma.participant.create({
        data: {
            userId: user.id,
            poolId: pool.id
        }
    })
    */

    /* To create games */
    await prisma.game.create({
        data: {
            date: '2022-11-20T16:00:00Z',
            firstTeamCountryCode: 'QAT',
            secondTeamCountryCode: 'ECU',
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-21T13:00:00Z',
            firstTeamCountryCode: 'ENG',
            secondTeamCountryCode: 'IRE',

            guesses: {
                create: {
                    firstTeamPoints: 4,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
}

main()