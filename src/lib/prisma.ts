/**
 * PostgreSQL + Prisma ORM Ready Architecture
 *
 * This singleton provides the database client abstraction.
 * When DATABASE_URL is configured and Prisma Client is generated via `npx prisma generate`,
 * it delegates to the PostgreSQL database.
 * For the initial demo, it provides a typed interface matching the Prisma models.
 */

export interface PrismaDatabaseClient {
  car: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: { where: { slug?: string; id?: string } }) => Promise<any | null>;
    create: (args: { data: any }) => Promise<any>;
    update: (args: { where: { id: string }; data: any }) => Promise<any>;
    delete: (args: { where: { id: string } }) => Promise<any>;
  };
  testDriveBooking: {
    create: (args: { data: any }) => Promise<any>;
    findMany: (args?: any) => Promise<any[]>;
  };
  leadEnquiry: {
    create: (args: { data: any }) => Promise<any>;
    findMany: (args?: any) => Promise<any[]>;
  };
  valuationRequest: {
    create: (args: { data: any }) => Promise<any>;
    findMany: (args?: any) => Promise<any[]>;
  };
}

let prismaClientInstance: PrismaDatabaseClient | null = null;

try {
  // If @prisma/client is generated with PrismaClient constructor
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaPackage = require("@prisma/client");
  if (prismaPackage && prismaPackage.PrismaClient) {
    const globalForPrisma = globalThis as unknown as {
      prisma: any;
    };
    prismaClientInstance =
      globalForPrisma.prisma ??
      new prismaPackage.PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClientInstance;
    }
  }
} catch {
  // Prisma client not yet generated; fallback architecture active
}

export const prisma = prismaClientInstance;
export default prisma;
