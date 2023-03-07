import paginator from "prisma-paginate";
import { PrismaClient } from "prisma/prisma-client";

const prisma = paginator(new PrismaClient());

export default prisma;
