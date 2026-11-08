# AGENTS.md file

## Node.js Runtime

Orion Commons is a TypeScript library for [Node.js](https://nodejs.org), published to npm as `orion-commons` and shared by the Orion apps (eg: Orion Stock Watch and Orion Retail Bridge). The CI tests it on Node.js 16 to 21.

## Building

The library is written as ES modules in `index.ts` and `ts/` and compiled into `dist/` (JavaScript and type declarations), which is what gets published:

```bash
npm run build
```

## Formatting

Always format the code before committing using, making sure that the TypeScript code is properly formatted using:

```bash
npm run pretty
```

The formatting rules are defined in `.prettierrc` and `.eslintrc.cjs` (via `@typescript-eslint`).

## Testing

To run the suite of tests for Orion Commons use the following command:

```bash
npm test
```

The tests use [Mocha](https://mochajs.org) with [Chai](https://www.chaijs.com) assertions and live in `test/` as `*.test.ts` files.

Try to run the tests whenever making changes to the codebase, before committing new code.

## Style Guide

- Always update `CHANGELOG.md` according to semantic versioning, mentioning your changes in the unreleased section.
- Write commit messages using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Never bump the internal package version in `package.json`. This is handled automatically by the release process.
- TypeScript files and `tsconfig.json` use CRLF as the line ending.
- The implementation should be done in TypeScript, exporting new modules from `ts/index.ts`.
- The style should respect the `prettier` and `eslint` formatting rules defined in the project configuration.
- The implementation should be done in a way that is compatible with the existing codebase.
- Dependencies should be managed through `package.json`. Packages shared with the apps (`dotenv`, `fastify`, `hive-js-util` and `yonius`) are peer dependencies, also listed in the development dependencies to build and test, so keep both ranges in sync.
- Narrowing a peer dependency range is a breaking change for the apps.

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with the following structure:

```text
<type>: <description>

<body>
```

### Commit Types

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature or functionality                          |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only changes                              |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore`    | Maintenance tasks, dependency updates, build changes    |
| `test`     | Adding or updating tests                                |
| `version`  | Version bump commits (reserved for releases)            |

### Guidelines

- Use lowercase for the type prefix.
- Use imperative mood in the description (e.g., "Add feature" not "Added feature").
- Keep the first line under 50 characters.
- Reference issue/PR numbers when applicable using `(#123)` at the end.
- For version releases, use the format `version: X.Y.Z`.
- Add an extra newline between subject and body.
- Make the body a series of bullet points about the commit.
- Be descriptive always making use of the body of the message.

### Examples

```text
feat: Add user authentication with OAuth 2.0 support (#138)
fix: Resolve race condition in database connection pool
docs: Add API endpoint documentation for v2 routes
refactor: Extract validation logic into reusable utility module
chore: Update dependencies to latest stable versions
test: Add integration tests for payment processing flow
version: 1.8.0
```

## Pre-Commit Checklist

Before committing, ensure that the following operations items check:

- [ ] Code is formatted with `npm run pretty`
- [ ] Build and lint pass: `npm run build` and `npm run lint`
- [ ] Tests pass: `npm test`
- [ ] CHANGELOG.md is updated in [Unreleased] section
- [ ] No debugging print statements or commented-out code
- [ ] CRLF line endings are preserved

## New Release

To create a new release follow the following steps:

- Make sure that the build, the lint, the tests and the code formatting are valid.
- Increment (look at `CHANGELOG.md` for semver changes) the `version` value in `package.json`. While the version is `0.x`, breaking changes (such as narrowing a peer dependency range) increment the minor version.
- Move all the `CHANGELOG.md` Unreleased items that have at least one non empty item into a new section with the new version number and date, and then create new empty sub-sections (Added, Changed and Fixed) for the Unreleased section with a single empty item.
- Create a commit with the following message `version: $VERSION_NUMBER`.
- Push the commit.
- Create a new signed tag with the value of the new version number `$VERSION_NUMBER` as both its name and message.
- Pushing the tag runs the Deploy Workflow, which builds, lints and tests the library and publishes it to npm.
- Create a new release on the GitHub repo using the Markdown from the corresponding version entry in `CHANGELOG.md` as the description of the release and the version number as the title. Do not include the title of the release (version and date) in the description.

## License

Orion Commons for JavaScript is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/).
