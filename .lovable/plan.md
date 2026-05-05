## Goal
Produce a downloadable zip archive containing the full base code of the Araska website, so you can download the project as a single file.

## What will be included
The complete project source tree, excluding generated/local-only folders:
- All of `src/` (pages, components, hooks, lib, styles, tests)
- `public/` assets
- `index.html`
- Config files: `package.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig*.json`, `eslint.config.js`, `vitest.config.ts`, `components.json`
- `README.md`

## What will be excluded (to keep the zip small and clean)
- `node_modules/` — reinstall with `npm install` after unzipping
- `dist/` / build output
- `.git/`, `.lovable/`, local caches and lock-only artifacts not needed to run

(`package.json` is included, so dependencies can be restored.)

## Steps
1. Create `/mnt/documents/araska-website.zip` by zipping the project root with the exclusions above.
2. Verify the archive contents and report the file size.
3. Provide the zip as a downloadable artifact.

## Technical detail
Run a single `zip -r` command from the project root excluding the folders listed above, output to `/mnt/documents/araska-website.zip`, then surface it via a `presentation-artifact` tag for download.
