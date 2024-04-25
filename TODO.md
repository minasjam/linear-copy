# TODO list

## What needs to be built?

### Essentials

- [x] trpc authenticated procedures
- [x] deploy to Vercel
- [x] add E2E tests
- [x] add tests to the pipeline
- [ ] update Readme once I move on from this

### Next

- zkusit věci, které se diskutovaly na Guild meetingu jako ideální stack
  - renovate bot aj.

### Nice to haves

- [] add cypress login variables to env variables
- [] review the multi tenancy from a security prespective
- [] run the tests only when PR exists
  - [] stop tests if multiple commits are made in quick succession, and test only the last commit
- [] do not run builds on certain commit prefixes - docs, style (any others?)
- [] name the actions so that it is obvious where the action came from
- [] trpc authenticated procedures
- [] enable drag and drop
- [] add a notification system

### Look at for awesome content

- Nice renovate config: https://github.com/prisma/prisma/blob/main/.github/renovate.json
