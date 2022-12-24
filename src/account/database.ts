import { PrismaClient } from "@prisma/client";

export default async function disconnect(prisma: PrismaClient) {
    await prisma.$disconnect();
}