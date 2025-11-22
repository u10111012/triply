# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start dev server on port 3000
pnpm build            # Production build
pnpm serve            # Preview production build

# Testing & Quality
pnpm test             # Run tests (Vitest)
pnpm lint             # Run Biome linter
pnpm format           # Run Biome formatter
pnpm check            # Run Biome check (lint + format)

# Database (Prisma with Neon)
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database

# Deployment
pnpm deploy           # Deploy to Cloudflare Workers
```

## Architecture

**Stack**: TanStack Start (React meta-framework) + Cloudflare Workers + Neon PostgreSQL + Prisma

### Key Directories

- `src/routes/` - File-based routing (TanStack Router). Files become routes automatically.
- `src/routes/demo/` - Demo routes showcasing various features (prefixed with `demo` - can be deleted)
- `src/components/` - React components. UI primitives in `ui/` (Shadcn).
- `src/integrations/tanstack-query/` - React Query setup and providers
- `src/generated/prisma/` - Generated Prisma client (don't edit)
- `prisma/schema.prisma` - Database schema

### Routing Patterns

- `__root.tsx` - Root layout, wraps all routes
- API routes: `api.*.ts` files (e.g., `api.names.ts` → `/api/names`)
- Nested routes: Use `.` in filename (e.g., `start.ssr.index.tsx`)
- Dynamic routes: Use `$param` (e.g., `$guitarId.tsx`)

### Data Flow

- **Server functions**: TanStack Start server functions for API calls
- **State management**: TanStack Store (`src/lib/demo-store.ts`)
- **Data fetching**: TanStack Query with SSR integration via `react-router-ssr-query`
- **Database**: Prisma client in `src/db.ts` with Neon serverless adapter

### Environment Variables

- Use T3Env for type-safe env vars (`src/env.ts`)
- Client vars must be prefixed with `VITE_`
- Database env uses `.env.local` (via `dotenv-cli`)
- Required: `DATABASE_URL`, `ANTHROPIC_API_KEY` (for AI features)

## Code Style

- **Formatter**: Biome with tabs, double quotes
- **Imports**: Auto-organized by Biome
- **Path aliases**: `@/` maps to `src/` (via vite-tsconfig-paths)

## Adding Components

```bash
pnpx shadcn@latest add <component>  # e.g., pnpx shadcn@latest add button
```