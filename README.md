# AI Code Review

An AI-powered code review platform that connects to your GitHub repositories, indexes your codebase for context, and (in progress) automatically reviews pull requests using retrieval-augmented generation.

Built with Next.js, Prisma, Inngest, and Pinecone — inspired by tools like CodeRabbit.

## How it works

1. **Sign in with GitHub** — OAuth via Better Auth, requesting `repo` scope.
2. **Connect a repository** — pick a repo from your GitHub account; the app registers a webhook on it for `pull_request` events.
3. **Codebase indexing** — an Inngest background job pulls every file from the connected repo, generates embeddings with Google's `text-embedding-004`, and stores them in Pinecone so the codebase can be searched semantically.
4. **PR review (in progress)** — when a PR is opened, the webhook will retrieve relevant code context from Pinecone and use an LLM to generate inline review comments. *(Webhook handler currently receives GitHub events; the review-generation step is still being built.)*

## Features

**Implemented**
- GitHub OAuth login (Better Auth)
- Repository browsing and connection from a user's GitHub account
- Automatic webhook registration/removal on connected repos
- Full-repo file ingestion + embedding generation
- Vector storage and semantic retrieval via Pinecone
- Dashboard with GitHub contribution graph
- Account/repository settings management

**In progress**
- AI-generated review comments posted back to the PR
- Simulated payment/subscription flow

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Auth | Better Auth (GitHub OAuth) |
| Database | PostgreSQL, Prisma ORM |
| Background jobs | Inngest |
| AI / embeddings | Vercel AI SDK, Google `text-embedding-004` |
| Vector store | Pinecone |
| GitHub integration | Octokit (REST + GraphQL) |
| UI | shadcn/ui, Tailwind CSS, Recharts |

## Project structure

```
app/
  (auth)/           # Login page
  api/
    auth/[...all]/  # Better Auth routes
    inngest/        # Inngest job endpoint
    webhooks/github/ # GitHub webhook receiver
  dashboard/        # Dashboard, repository, settings pages
inngest/
  functions/        # Background job: repo indexing
lib/
  auth.ts           # Better Auth config
  db.ts             # Prisma client
  pinecone.ts        # Pinecone client
module/
  ai/lib/rag.ts      # Embedding generation + vector search
  github/lib/github.ts # GitHub API helpers (repos, webhooks, file fetching)
  dashboard/, repository/, settings/  # Feature modules
prisma/
  schema.prisma      # User, Repository, Session, Account models
```

## Getting started

### Prerequisites
- Node.js 18+
- A PostgreSQL database
- A GitHub OAuth App (Client ID + Secret)
- A Pinecone account and index named `ai-code-reviewer`
- A Google AI API key (for embeddings)

### Setup

```bash
git clone https://github.com/PrateekBanwari712/Ai-Code-Review.git
cd Ai-Code-Review
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
PINECONE_DB_API_KEY=...
GOOGLE_GENERATIVE_AI_API_KEY=...
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
```

Run database migrations and start the dev server:

```bash
npx prisma migrate deploy
npm run dev
```

The app will be available at `http://localhost:3000`.

## Roadmap

- [ ] Generate AI review comments from PR diffs using retrieved codebase context
- [ ] Post review comments back to the GitHub PR via the API
- [ ] Simulated payment/subscription flow (Stripe test mode)
- [ ] Deploy a live demo

## License

MIT