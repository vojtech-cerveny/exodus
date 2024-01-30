import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var globalPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.globalPrisma) {
    global.globalPrisma = new PrismaClient();
  }

  prisma = global.globalPrisma;
}

// Disconnect after a request
async function handleRequest(req: any, res: any) {
  try {
    // Handle the request...
  } finally {
    await prisma.$disconnect();
  }
}

export default prisma;
