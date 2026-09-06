# renovate-config

Shared Renovate preset for uinaf repositories. Extend it from a repository's
`renovate.json`:

```json
{ "$schema": "https://docs.renovatebot.com/renovate-schema.json", "extends": ["github>uinaf/renovate-config"] }
```

Policy: daily window (00:00–06:00 Europe/Istanbul), seven-day minimum release age, patch and
minor grouped per manager, majors separate, digest pinning for Actions and
images, `ci` prefix for Actions and `deps` for everything else, OpenTofu
registry for providers. Non-major updates automerge by squash once every
check on the pull request passes; repositories with no checks and all majors
stay manual. Ansible or mise version variables opt in with a
`# renovate: datasource=… depName=…` comment above the key.

The hosted Renovate app runs the jobs; the schedule permits new update branches
during that window, rather than guaranteeing an exact start time. Existing PR
checks and automerge can finish outside it. Initial pins bypass the window and
release age.

Validate with `npx --yes --package renovate -- renovate-config-validator default.json`.
