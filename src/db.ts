import { PrismaClient } from './generated/prisma/client.js'
import { neon } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

export async function getClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) return undefined
  return neon(databaseUrl)
}

const createAdapter = () => {
  const sql = neon(process.env.DATABASE_URL!)
  return new PrismaNeon(sql)
}

declare global {
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter: createAdapter() })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
