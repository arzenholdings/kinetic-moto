# Kinetic Moto Deployment Workflow

Every completed build task must follow this delivery chain:

1. Run local checks
   - `npm run lint`
   - `npm run build`
   - validate affected route locally when practical

2. Commit changes
   - Use a clear task-scoped commit message.
   - Do not commit `.env*`, `.vercel/`, `node_modules/`, `.next/`, or secrets.

3. Push to GitHub
   - Push to `main` unless a branch workflow is introduced.

4. Trigger Vercel deployment
   - GitHub push should auto-trigger Vercel.
   - Confirm Vercel build succeeds before marking Linear issue Done.

5. Update Linear
   - Add a comment with files changed, checks run, deployment URL/status, and reviewer approval.
   - Mark Done only after reviewer approval and successful deployment.
