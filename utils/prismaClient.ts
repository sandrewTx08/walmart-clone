import extension from "prisma-paginate";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient().$extends(extension);

export default prisma;
