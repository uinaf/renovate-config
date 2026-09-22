![renovate-config — shared Renovate preset for uinaf repositories.](https://uinaf.dev/og/banner/renovate-config.png)

# renovate-config

Shared Renovate preset for uinaf repositories. Extend it from a repository's
`renovate.json`:

```json
{ "$schema": "https://docs.renovatebot.com/renovate-schema.json", "extends": ["github>uinaf/renovate-config"] }
```

Policy: daily window (00:00–05:59 Europe/Istanbul), seven-day minimum release age —
one day for container images and Actions, which are digest-pinned, none for
our own `uinaf/.github` workflows and actions — patch and
minor grouped per manager, majors separate — except the `python` and `node`
runtimes, whose version pin, `requires-python` range, and image tag always
move in one PR — digest pinning for Actions and
images, `ci` prefix for Actions and `deps` for everything else, OpenTofu
registry for providers. Non-major version and pin updates automerge by squash
after passing checks. Updates in repositories with no checks, major updates,
and digest-only updates stay manual — digest updates have no release
timestamps, so the age gate cannot vouch for them. YAML version variables
opt in with a `# renovate: datasource=… depName=…` comment above
the key.

The hosted Renovate app runs the jobs; the schedule permits new update branches
during that window, rather than guaranteeing an exact start time. Existing PR
checks and automerge can finish outside it. Initial pins bypass the window and
release age.

## Merge mechanism

The shared preset sets `platformAutomerge: true`: Renovate enables GitHub's
auto-merge on the pull request and GitHub merges once the repository's
**required** checks pass; an optional check does not block merging. Every
altaywtf and uinaf repository has **Allow auto-merge** on and required checks in
its ruleset. A repository without either can set `platformAutomerge: false` so
Renovate waits for visible checks and merges on a later run. Eligibility,
release age, and manual update types stay the same in both modes.

The repository's `default-branch-checks` ruleset governs every default-branch
update, including direct pushes. Approved direct writers need explicit
repository-scoped exceptions; Renovate gets no checks exemption. Keep signing,
deletion, and force-push protections separate. See the
[organization policy](https://github.com/uinaf/.github#default-branch-checks).

Keep the shared default off so repositories without enforced gates cannot opt
in accidentally. Reverting an opt-in does not cancel auto-merge already enabled
on open PRs; disable those pending requests before removing required checks.

Validate configuration changes with
`npx --yes --package renovate -- renovate-config-validator default.json`.
The validator accepts any string in `extends`, so `npm run verify` also resolves the presets to catch a preset name that does not exist.
