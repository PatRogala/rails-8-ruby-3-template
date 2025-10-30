## Modern Rails 8.1 + Ruby 3.4 Template

A production-ready Rails template with a modern stack: Hotwire, Tailwind CSS, Bun bundling, Devise auth, Sidekiq jobs (with DragonflyDB as Redis-compatible backend), Solid Cache, ViewComponent, RSpec/Cucumber tests, Lograge logging, and Kamal + Docker deployment.

### Highlights
- **Rails**: 8.1, **Ruby**: 3.4
- **Frontend**: Hotwire (Turbo + Stimulus), Tailwind CSS 4 via Bun
- **Auth**: Devise (+ devise-i18n)
- **UI**: ViewComponent, Haml
- **Jobs**: Sidekiq (DragonflyDB as Redis-compatible backend)
- **Cache**: Solid Cache (database-backed)
- **DB**: PostgreSQL
- **Logging**: Lograge (JSON in prod)
- **Security/Quality**: RuboCop, Brakeman, Bundler Audit, Prosopite, ActiveRecord Doctor, Database Consistency
- **Testing**: RSpec (+ rspec-sidekiq), Capybara, FactoryBot, Faker, SimpleCov, Cucumber
- **Deploy**: Kamal + Docker


## Prerequisites
- Ruby 3.4.x (use `rbenv` or `asdf`)
- Bun (for JS/CSS bundling) — install from `https://bun.sh`
- Docker & Docker Compose (for local containers)


## Quick Start (Docker)
This is the simplest and recommended way to run the stack locally.

```bash
docker compose up --build
```

Then open:
- App: `http://localhost:3000`
- MailCatcher: `http://localhost:1080` (SMTP on `1025`)

Services defined in `docker-compose.yml`:
- `backend`: Rails app (runs `bin/dev` with Procfile)
- `postgresql`: Postgres 17
- `dragonfly`: DragonflyDB (Redis-compatible; used by Sidekiq)
- `mailcatcher`: Dev/test mail inbox

Initial database setup (first run only):
```bash
docker compose exec backend bin/rails db:setup
```


## Alternative: Local (without Docker)
1) Install gems and JS deps
```bash
bundle install
bun install
```

2) Setup database
```bash
bin/rails db:setup
```

3) Run dev processes (Rails, JS, CSS) via Procfile
```bash
bin/dev
```

The `Procfile.dev` runs:
- Web: `bin/thrust bin/rails server -p 3000 -b '0.0.0.0'`
- JS: `bun run build --watch`
- CSS: `bun run build:css --watch`


## Stack Details
### Gems (core)
- `rails`, `pg`, `puma`, `propshaft`
- `jsbundling-rails` (Bun), `cssbundling-rails` (Tailwind)
- `turbo-rails`, `stimulus-rails`
- `solid_cache` (Rails.cache DB-backed)
- `sidekiq` (background jobs)
- `devise`, `devise-i18n` (authentication)
- `view_component` (UI composition)
- `haml-rails` (views)
- `lograge` (prod logs)
- `interactor-rails` (service/interactor pattern)
- `rails-i18n` (I18n base)
- `prosopite` + `pg_query` (N+1 detection)
- `pghero` (DB insights)
- `lucide-rails` (icons)

### Dev/Test gems
- Debugging: `debug`, `byebug`, `web-console`
- Testing: `rspec-rails`, `rspec-sidekiq`, `capybara`, `factory_bot_rails`, `faker`, `simplecov`, `cucumber-rails`
- Quality/Security: `rubocop` (+ extensions), `brakeman`, `bundler-audit`, `database_consistency`, `active_record_doctor`, `strong_migrations`

### JavaScript & CSS
- Bundler: Bun (`bun.config.js`)
- Tailwind: `@tailwindcss/cli` v4
- Scripts from `package.json`:
  - `bun run build` — JS build (+ watch via `--watch`)
  - `bun run build:css` — Tailwind build


## Configuration
### Environment variables
- Managed via `dotenv-rails` (`.env` locally). Common vars: database, cache/job endpoints, mailer settings.
- Docker services provide sensible defaults (Postgres, DragonflyDB, MailCatcher).

### Caching
- Uses `solid_cache` (database-backed cache store). No external cache service required.

### Background jobs
- Sidekiq runs against DragonflyDB (Redis-compatible) in Docker. For non-Docker, provide `REDIS_URL`/Dragonfly endpoint accordingly.

### Internationalization
- Default locale: `:pl`
- Available locales: `:pl`, `:en`
- Translations live under `config/locales/`. ViewComponent translations are often namespaced in `app/components/**/component.[pl|en].yml`.

### Logging
- Development/test: standard Rails logs
- Production: Lograge (single-line JSON)


## Development Workflow
Common commands:
```bash
# run the app (Docker)
docker compose up --build

# run the app (local)
bin/dev

# open rails console
bin/rails console

# run one-off tasks
bin/rails <task>
```

Frontend entrypoint is `app/javascript/application.js`; CSS entry is `app/assets/stylesheets/application.tailwind.css`. Built assets output to `app/assets/builds/`.


## Testing
```bash
# RSpec
bundle exec rspec

# Cucumber
bundle exec cucumber

# With coverage (RSpec)
OPEN_COVERAGE=1 bundle exec rspec
```

System tests use Capybara; factories via FactoryBot. Sidekiq specs use `rspec-sidekiq`.


## Quality & Security
```bash
# RuboCop
bundle exec rubocop

# Brakeman
bundle exec brakeman

# Bundler Audit
bundle exec bundler-audit check --update

# Database Consistency
bundle exec database_consistency

# ActiveRecord Doctor
bundle exec rake active_record_doctor
```

Prosopite is enabled in dev/test to flag N+1 queries.


## Deployment
- Containerized via Docker
- Deploy with **Kamal** (`kamal` gem). See `config/deploy.yml` for configuration and the Kamal docs at `https://kamal-deploy.org`.


## Project Structure (high level)
- `app/components/` — ViewComponents (+ localized ymls)
- `app/javascript/` — Stimulus controllers, app entry
- `app/assets/stylesheets/application.tailwind.css` — Tailwind entry
- `config/initializers/` — Devise, Sidekiq, Lograge, Prosopite, Strong Migrations
- `db/migrate/` — Devise users, roles, user_roles, etc.
- `spec/` — RSpec tests; `features/` — Cucumber tests
- `app/views/pwa/` — PWA manifest & service worker


## Troubleshooting
- Ports busy: stop other services on `3000`, `1025`, `1080`.
- Mail not arriving: confirm SMTP `1025` and visit `http://localhost:1080`.
- Asset build issues: ensure Bun is installed and run `bun run build`.
- DB errors on first run: run `bin/rails db:setup` (or via Docker `docker compose exec backend bin/rails db:setup`).


## License
MIT
