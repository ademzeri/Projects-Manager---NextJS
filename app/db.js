import { PrismaClient } from "@prisma/client";

// Singleton pattern for PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query"], // Log Prisma queries for debugging (optional)
  });
};

// Access the singleton instance globally
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Assign the singleton to `globalThis` for non-production environments
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export { prisma };

export async function createProject(project) {
  const newProject = await prisma.project.create({
    data: { title, complete: false },
  });
}
