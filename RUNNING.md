# Running Noir Ember in constrained environments

This repository contains two runnable paths:

1. **Zero-dependency preview** for environments where npm registry access is blocked.
   ```bash
   npm run dev
   ```
   This starts `server.js`, a small Node.js static server, and serves `public/index.html` at <http://localhost:3000>.

2. **Full Next.js implementation** for normal development environments with npm registry access.
   ```bash
   npm install
   npm run dev:next
   ```

## npm registry diagnosis from this environment

The environment exposes proxy variables such as `HTTP_PROXY=http://proxy:8080`, `HTTPS_PROXY=http://proxy:8080`, `npm_config_http_proxy=http://proxy:8080`, and `npm_config_https_proxy=http://proxy:8080`.

Registry configuration itself is correct: `npm config get registry` returns `https://registry.npmjs.org/`, and no project `.npmrc` overrides are present.

The failure occurs before package resolution succeeds:

- With proxy variables enabled, `curl -I https://registry.npmjs.org/` fails during proxy tunneling with `CONNECT tunnel failed, response 403`.
- `npm ping` and `npm view next version` return `403 Forbidden` from the registry URL through the proxy.
- With proxy variables cleared, DNS lookup fails for `registry.npmjs.org` with `EAI_AGAIN`, so direct access is not available from the container.
- Alternate package managers (`bun`, `yarn`, and `pnpm`) also fail because they must reach the same blocked package registry.

## Minimum steps outside this restricted environment

On a machine or CI runner with normal npm registry access:

```bash
npm install
npm run dev:next
```

Then open <http://localhost:3000>.
