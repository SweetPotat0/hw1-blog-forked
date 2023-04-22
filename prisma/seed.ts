import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// const userData: (numberOfUsers: number) => Prisma.UserCreateInput[] = (numberOfUsers) => {
//     const users: Prisma.UserCreateInput[] = []
//     for (let i = 1; i <= numberOfUsers; i++) {
//         users.push(
//             {
//                 name: `Alice${i}`,
//                 email: `alice${i}@prisma.io`,
//                 posts: {
//                     create: [
//                         {
//                             title: 'Join the Prisma Slack',
//                             content: 'https://slack.prisma.io',
//                             published: true,
//                         },
//                     ],
//                 },
//             })
//     }    
//     return users
// }

const userData: (i: number) => Prisma.UserCreateInput = (i) => {
    return (
        {
            name: `Alice${i}`,
            email: `alice${i}@prisma.io`,
            posts: {
                create: [
                    {
                        title: 'Join the Prisma Slack',
                        content: 'https://slack.prisma.io',
                        published: true,
                    },
                ],
            },
        })
}
// {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     posts: {
//         create: [
//             {
//                 title: 'Follow Prisma on Twitter',
//                 content: 'https://www.twitter.com/prisma',
//                 published: true,
//             },
//         ],
//     },
// },
// {
//     name: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     posts: {
//         create: [
//             {
//                 title: 'Ask a question about Prisma on GitHub',
//                 content: 'https://www.github.com/prisma/prisma/discussions',
//                 published: true,
//             },
//             {
//                 title: 'Prisma on YouTube',
//                 content: 'https://pris.ly/youtube',
//             },
//         ],
//     },
// },


// const creatUserData:  = () => {
//     for (let i = 0; i < 1000000; i++) {
//         userData;
//     }
// }

async function main() {
    console.log(`Start seeding ...`);
    for (let i = 1; i <= 100; i++) {
        const user = await prisma.user.create({
            data: userData(i),
        })
        if (i % 5000 == 0) {
            console.log(`Created user with id: ${user.id}`)
        }
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
