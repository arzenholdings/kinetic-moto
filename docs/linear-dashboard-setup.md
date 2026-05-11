# Linear Projects Dashboard Setup

The internal Linear Projects Dashboard lives at `/admin/linear` and is read-only.

## Environment

Add a Linear personal API key to the server environment:

```env
LINEAR_API_KEY=lin_api_your_key_here
```

Do not prefix this variable with `NEXT_PUBLIC_`. The browser only calls the local Next.js API route at `/api/admin/linear`; the Linear API key is read on the server and is never sent to the client.

## Creating a Linear API key

1. Open Linear.
2. Go to Settings, then Account, then Security & access.
3. Create a personal API key with read access to the projects and teams you want to show.
4. Add the key to `.env.local` for local development or to your deployment provider's server-side environment variables.
5. Restart the Next.js process after changing environment variables.

## Local verification

```bash
npm run lint
npm run build
```

Then open:

```text
http://localhost:3000/admin/linear
```

If `LINEAR_API_KEY` is missing, the dashboard shows a friendly setup message instead of trying to contact Linear.
