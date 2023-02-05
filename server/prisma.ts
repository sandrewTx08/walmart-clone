import { PrismaClient } from "@prisma/client";
import { paginateClient } from "prisma-paginate";

const prisma = paginateClient(new PrismaClient());

export default prisma;
