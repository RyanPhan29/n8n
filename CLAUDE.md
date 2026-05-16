# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

n8n is a fair-code workflow automation platform organized as a pnpm + Turborepo monorepo. Node.js >= 20.15 and pnpm >= 10.2.1 are required (managed via corepack). Do not use `npm install` — `scripts/block-npm-install.js` runs on `preinstall` and will abort.

## Common commands

All commands are run from the repo root unless noted. Turbo handles cross-package ordering and caching.

### Setup

```
pnpm install       # install all workspace deps
pnpm build         # build all packages (required at least once before `start`)
```

### Run

```
pnpm start                 # run built CLI (packages/cli/bin/n8n)
pnpm start:tunnel          # run with public tunnel
pnpm webhook               # run webhook process
pnpm worker                # run queue worker
pnpm dev                   # parallel dev: backend rebuild + editor-ui HMR (excludes design-system, chat, task-runner)
pnpm dev:be                # backend-only dev
pnpm dev:fe                # frontend-only dev (editor-ui + design-system)
pnpm dev:ai                # dev focused on the LangChain nodes package
pnpm dev:e2e               # start n8n in dev mode + Cypress interactive (run `pnpm cypress:install` once first)
```

### Quality gates

```
pnpm typecheck             # tsc --noEmit across packages
pnpm lint                  # turbo: backend + frontend + nodes lint groups
pnpm lint:backend / lint:frontend / lint:nodes
pnpm lintfix               # eslint --fix everywhere
pnpm format                # biome format + prettier (for vue/yml/md/css/scss)
pnpm format:check          # CI-style check, no writes
```

Lefthook runs Biome on staged `.{js,ts,json}` and Prettier on staged `.{vue,yml,md,css,scss}` at pre-commit (`lefthook.yml`).

### Tests

Backend/workflow/core tests use Jest; `editor-ui` and `@n8n/chat` use Vitest; E2E uses Cypress.

```
pnpm test                  # all packages (turbo)
pnpm test:backend          # jest across backend packages (concurrency=1)
pnpm test:frontend         # vitest across frontend packages
pnpm test:nodes            # jest across node packages
```

Run tests for a single package by `cd`-ing into it and invoking its `test` script (jest or vitest). Examples:

```
cd packages/cli && pnpm test                  # sqlite by default (test:sqlite)
cd packages/cli && pnpm test:postgres         # requires running Postgres
cd packages/cli && pnpm test:mariadb / test:mysql
cd packages/cli && pnpm test:dev              # jest --watch
cd packages/core && pnpm jest path/to/file.test.ts
cd packages/frontend/editor-ui && pnpm vitest <pattern>
```

For snapshot updates pass `-u` to jest / press `u` in watch mode.

E2E:
```
pnpm --filter n8n-cypress cypress:install     # one-time
pnpm dev:e2e                                  # dev mode, interactive
pnpm --filter n8n-cypress test:e2e:all        # headless against built UI
```

## Architecture

### Workspace layout (pnpm-workspace.yaml + turbo.json)

The monorepo is layered. Lower layers must not depend on higher ones.

- **`packages/workflow`** — pure, environment-agnostic core. Workflow class, expression engine (`Expression`, `WorkflowDataProxy`), node interfaces (`INode*`, `IExecuteFunctions`, …), error types. Shared by backend, frontend, and nodes — keep it dependency-light.
- **`packages/core`** — runtime services that need Node.js: `execution-engine/` (the `WorkflowExecute` loop, partial executions, triggers/pollers, scheduled tasks), `binary-data/` (filesystem + S3 object store), `nodes-loader/`, `node-execute-functions.ts` (the helpers exposed to nodes at runtime), encryption, instance settings. **Per CONTRIBUTING.md: contact n8n before changing this package.**
- **`packages/cli`** — the n8n server. Express app (`abstract-server.ts`), `commands/` (oclif: `start`, `worker`, `webhook`, `execute`, `execute-batch`, db, import/export, user-management, …), `controllers/` (REST endpoints), `services/`, `databases/` (TypeORM entities + migrations split by `sqlite|postgresdb|mysqldb|common`), `public-api/`, `auth/`, `mfa/`, `permissions.ee/`, `evaluation.ee/`, `environments.ee/`, `external-secrets.ee/`, `ldap.ee/`, `modules/` (Insights). `.ee` suffix means Enterprise Edition source compiled into the same binary but gated by license.
- **`packages/nodes-base`** — 300+ first-party nodes & credentials. Each node lives in `nodes/<NodeName>/` with `<NodeName>.node.ts`, `<NodeName>.node.json`, and often versioned subfolders (`V1/`, `V2/` containing `<NodeName>V2.node.ts`) for backward-compatible API revisions.
- **`packages/@n8n/nodes-langchain`** — AI nodes (agents, chains, embeddings, LLMs, memory, retrievers, tools, vector stores, MCP).
- **`packages/@n8n/*`** — internal libraries:
  - `di` — custom DI container (typedi replacement; uses `@Service()` and `Container.get()`).
  - `config` — typed env-var config via decorators.
  - `api-types` — DTOs/schemas shared between backend `controllers` and the editor.
  - `permissions`, `client-oauth2`, `imap`, `task-runner`, `extension-sdk`, `json-schema-to-zod`, `codemirror-lang`, `utils`, `eslint-config`, `typescript-config`, `vitest-config`, `storybook`, `benchmark`.
- **`packages/frontend/editor-ui`** — Vue 3 + Vite + Pinia + Element Plus + Vue Flow workflow editor. Talks to `packages/cli` REST/WS APIs and reuses types from `@n8n/api-types`.
- **`packages/frontend/@n8n/design-system`** / `composables` / `chat` — shared Vue components, composables, and embeddable chat widget.
- **`packages/extensions/insights`** — Insights module (mounted via `cli/src/modules`).
- **`packages/node-dev`** — CLI scaffolding for new community nodes.
- **`cypress/`** — E2E tests; its own pnpm workspace member with `pages/`, `composables/`, `e2e/`.

### Build orchestration

`turbo.json` defines task groups. `build:backend` is an alias for `n8n#build`; `build:frontend` for `n8n-editor-ui#build`; `build:nodes` for `n8n-nodes-base#build` + `@n8n/n8n-nodes-langchain#build`. Each declares `^build` dependencies so the layer graph above is enforced automatically. `dev` and `watch` are `persistent: true` (long-running).

### Backend runtime architecture

- **DI everywhere**: services, controllers, and many helpers are decorated with `@Service()` from `@n8n/di`. Resolve via `Container.get(MyService)` rather than `new`. `emitDecoratorMetadata` + `experimentalDecorators` are on in `packages/cli/tsconfig.json`.
- **Process modes**: a single `n8n` binary supports `start` (main), `worker` (queue consumer), `webhook` (webhook receiver). Queue mode uses Bull (patched in `patches/bull@4.12.1.patch`) + Redis.
- **Database**: TypeORM with SQLite (default), Postgres, MySQL, MariaDB. Every schema change requires a migration file in **all four** subfolders under `packages/cli/src/databases/migrations/`. `.github/CODEOWNERS` routes migration PRs to `@n8n-io/migrations-review`.
- **Execution engine**: `core/src/execution-engine/workflow-execute.ts` drives a node graph; `node-execute-functions.ts` materializes the `IExecuteFunctions` API each node receives. `partial-execution-utils/` powers re-running from a single node with cached upstream data.
- **Task runner**: untrusted Code-node JS/Python runs in `@n8n/task-runner` (separate process) via the launcher in `packages/cli/src/task-runners`.

### Frontend architecture

Vue 3 SFCs with Pinia stores under `packages/frontend/editor-ui/src/stores/`. The canvas uses `@vue-flow/core`. Code editors (Code node, expressions) use CodeMirror 6 with the custom languages in `@n8n/codemirror-lang(-sql)`. Dev server proxies to `http://localhost:5678` (n8n backend) — start backend first when running `dev:fe`.

### Node authoring conventions

- A node = `<Name>.node.ts` (declaration + `execute`) + `<Name>.node.json` (codex metadata) + optional credential files in `packages/nodes-base/credentials/`. SVG icon next to the node file.
- Versioning: when an API or behavior changes incompatibly, add `V2/` (etc.) and expose both via `VersionedNodeType` so existing user workflows keep working.
- Tests: prefer **workflow tests** (declarative JSON loaded by a shared harness) — see `packages/nodes-base/nodes/Switch/V3/test/` for the canonical pattern. Unit tests live alongside in `__tests__/`.
- HTTP requests should go through `this.helpers.httpRequest*` (provided by `IExecuteFunctions`) so retries, proxies, and credential injection are handled centrally.

## Conventions

- **Formatting**: Biome formats `.{js,ts,json}` (tabs, width 100, single quotes, trailing commas, semicolons); Prettier handles `.vue` and prose files. Don't hand-format — run `pnpm format`.
- **Linting**: ESLint with `@n8n/eslint-config` (`base`, `node`, `frontend`, `local-rules`). `lint` runs with `--quiet` (errors only); use `lintfix` to apply autofixes.
- **TypeScript**: `ts-ignore` is forbidden per Community PR Guidelines — use `ts-expect-error` with a comment or fix the type. `strict` is currently `false` in `packages/cli` (do not regress, but new code should be type-safe).
- **`.ee.ts` files**: Enterprise-Edition code, compiled into the OSS build but feature-gated by license checks. Treat as part of the codebase but don't enable EE features in tests by default.
- **Commits/PRs**: titles follow Angular conventions — `<type>(<scope>): <Summary>` (imperative, capitalized, no period). Types: `feat fix perf test docs refactor build ci chore`. Scopes: `API | benchmark | core | editor | <nodeName> Node`. See `.github/pull_request_title_conventions.md`. Suffix `(no-changelog)` to skip the changelog. Breaking changes require an entry in `packages/cli/BREAKING-CHANGES.md`.
- **Don't add new nodes** unless explicitly requested — community node PRs are auto-closed. Custom nodes belong in a separate package.
- **Reuse existing parameters/components** across operations rather than duplicating definitions.
