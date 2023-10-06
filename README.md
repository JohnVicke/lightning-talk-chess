# Lightning talk 

## 🚀 Project Structure

```text
src
├── components
├── config
├── content
│   └── static content json
├── db
│   ├── migrations
│   ├── schema
│   ├── scripts
│   └── types
├── env
├── layouts
├── lib 
├── modules
│   └── 
├── pages
│   ├── api
│   └── ...pages
├── styles
└── utils
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Base Commands             | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |
| `bun run fmt`             | Run prettier                                     |
| `bun run fmt:check`       | Check format validity                            |
| `bun run test:typecheck`  | Check TypeScript types                           |
| `bun run lint`            | Lint files (eslint)                              |
| `bun run lint:fix`        | Find and fix linting problems                    |
| `bun run ci:check`        | Run all CI checks in parallel                    |


| Db Commands               | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun db:introspect`       | Pull DLL from existing database                  |
| `bun db:generate`         | Generate database migrations                     |
| `bun db:push`             | Push database changes                            |
| `bun db:studio`           | Preview your locally                             |


## Env
Enviornment variables are handled through [doppler](https://www.doppler.com/)
