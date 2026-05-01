<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project conventions

These decisions are locked in. Do not change them without explicit approval.

- **Prisma version: pinned to 6.x.** Do **not** upgrade to Prisma 7. The new `prisma-client` provider in v7 is TypeScript-only and breaks our JS imports.
- **Generator: legacy `prisma-client-js` provider with the default output location** (`node_modules/@prisma/client`). Do not set a custom `output` in `schema.prisma`.
- **Client construction: `new PrismaClient()` with no options.** The connection URL is read from the schema's `env("DATABASE_URL")` — do not pass `datasources` or other options in code.
- **Imports: use relative paths** (e.g. `../../../lib/prisma`). Do **not** use the `@/` alias — Turbopack resolution is unreliable in this project.
- **No `prisma.config.ts` file.** Configuration lives in `prisma/schema.prisma` and `.env` only.
- **`lib/prisma.js` is the Prisma singleton**, attached to `globalThis` for hot-reload safety in development. Always import the client from there; never call `new PrismaClient()` elsewhere.
