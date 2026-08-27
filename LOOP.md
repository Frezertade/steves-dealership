# Builder loop protocol (dealer)

Each Grok `/loop` fire does **one** task from `TASKS.md`, then stops.

## Pick

1. If `.grok/builder.lock` exists and is younger than 25 minutes, exit: another run is working.
2. Write `.grok/builder.lock` with ISO time + task id.
3. First markdown line matching `- [ ] **Dxx**` is the task. If none, the board is complete: delete the lock, do not push, report `DEALER COMPLETE — ready to push wip/system-complete`.

## Work

- Repo: `/Users/frezerkifle/steves-dealership`
- Branch: `wip/system-complete` only
- Implement only that task. No drive-by refactors, no extra features.
- `npm install` if `node_modules` is missing.

## Test / fix

1. `npm run build`
2. If D12 exists, also `npm run smoke`
3. On failure, fix and rebuild once or twice. Do not mark the task done if build fails.

## Commit

1. In `TASKS.md`, change that task to `- [x]`, set `current: none`, bump `completed`, set `last_completed` to the id.
2. `git add` the work (never add `.next`, `out`, `node_modules`, `.env.local`, lock file).
3. Commit: `feat(dealer): Dxx <short done-when>`
4. **Never `git push`.**
5. Delete `.grok/builder.lock`.

## Hard rules

- Do not change the mechanic repo in this loop.
- Do not use `--no-verify` to hide a red build.
- Do not invent VINs, luxury-franchise claims, or a different address. Lot is 1027 Dillerville Rd #16, Lancaster, PA 17603.
