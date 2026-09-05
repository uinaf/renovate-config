# renovate-config

Shared Renovate preset for uinaf repositories. Extend it from a repository's
`renovate.json`:

```json
{ "$schema": "https://docs.renovatebot.com/renovate-schema.json", "extends": ["github>uinaf/renovate-config"] }
```

Policy: monthly window (first week), seven-day minimum release age, patch and
minor grouped per manager, majors separate, digest pinning for Actions and
images, `ci` prefix for Actions and `deps` for everything else, OpenTofu
registry for providers. Ansible or mise version variables opt in with a
`# renovate: datasource=… depName=…` comment above the key.

Validate with `npx --yes --package renovate -- renovate-config-validator default.json`.
