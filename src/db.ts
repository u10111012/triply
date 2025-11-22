import { PrismaClient } from './generated/prisma/client.js'
import { neon } from '@neondatabase/serverless'

import { PrismaPg } from '@prisma/adapter-pg'

export async function getClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return undefined
  return neon(databaseUrl)
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

declare global {
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
