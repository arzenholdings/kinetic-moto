# Agent Instructions

Short practical guidance for Codex, Claude Code, and OpenClaw agents working in this repo.

## Project Context
- This is a Next.js 16 app. APIs and conventions may differ from older Next.js versions.
- When changing framework-specific behavior, check the installed docs in `node_modules/next/dist/docs/`.

## Setup
- Install dependencies: `npm install`
- Run locally: `npm run dev`

## Build and Lint
- Lint: `npm run lint`
- Build: `npm run build`
- Run both before committing changes that affect app behavior.

## Git Workflow
- Work from `main` unless the task explicitly calls for a feature branch.
- Keep commits small and task-scoped.
- Do not commit `.env*`, `.vercel/`, `node_modules/`, `.next/`, or secrets.
- Check `git status` before committing and include only intended files.

## Vercel Deployment
- Pushes to `main` should trigger Vercel automatically.
- Confirm the Vercel deployment succeeds before marking related work complete.

## Coding Style
- Follow existing file structure and component patterns.
- Prefer simple, readable React and TypeScript over new abstractions.
- Keep UI changes consistent with the current Tailwind and app styling.
- Avoid unrelated refactors or formatting churn.
