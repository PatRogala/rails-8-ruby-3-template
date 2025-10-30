---
alwaysApply: true
---
 # Application Overview

 ## Core Technologies

 *   **Backend:** Ruby 3.4, Ruby on Rails 8.1
 *   **Database:** PostgreSQL
 *   **Authentication:** Devise
 *   **Frontend:**
     *   Hotwire (Turbo & Stimulus)
     *   Tailwind CSS
     *   ViewComponent
 *   **JavaScript Bundling:** Bun
 *   **Background Jobs:** Sidekiq without ActiveJob
 *   **Caching:** Rails Cache (Configured with Solid Cache)
 *   **Testing:** RSpec, FactoryBot, ViewComponent Test Helpers, Prosopite (N+1 detection)
 *   **Deployment:** Kamal, Docker
 *   **Logging:** Standard Rails logs (development/test), Lograge (JSON format) in production.

 ## Key Conventions & Configurations

 *   **Internationalization (i18n):**
     *   Default locale: `:pl` (Polish)
     *   Available locales: `:pl`, `:en`
     *   Translations are managed in `config/locales/`. ViewComponent translations are often namespaced within their component directory (e.g., `app/components/main_page/courses_list_component.pl.yml`).
     *   `t()` helper is used extensively in views and components.
 *   **Schema Format:** Uses `:sql` format (`config/application.rb`).
 *   **Code Quality:**
     *   Strong Migrations gem is used (`config/initializers/strong_migrations.rb`).
     *   RuboCop auto-correction is enabled for generated files (`config/environments/development.rb`).
     *   Prosopite is used for N+1 query detection in development and test environments (`config/initializers/prosopite.rb`, `config/environments/development.rb`, `config/environments/test.rb`).
 *   **Interactors:** Uses the `interactor` gem pattern for service objects (e.g., `app/interactors/enroll_in_programming_course.rb`).
 * **Dry.rb** Use dry.rb gems for code standards.
 * **Design and UI** Simple, elegant design mostly dony with typographic, text and white space.

 ## Project Structure Highlights

 *   **Components:** UI elements are built using ViewComponent (`app/components/`)
 *   **Controllers:** Standard Rails controllers. Namespaced controllers for specific roles (`app/controllers/instructor/`).
 *   **Models:** Standard ActiveRecord models (`app/models/`). Key domain models include `User`, `Role`, `ProgrammingCourse`, `ProgrammingCourseChapter`, `ProgrammingCourseLesson`, `ProgrammingTask`.
 *   **JavaScript:** Stimulus controllers manage frontend interactivity (`app/javascript/controllers/`).
 *   **CSS:** Tailwind CSS is the primary framework (`app/assets/tailwind/application.css`).
 *   **Configuration:** Standard Rails configuration files in `config/`. Notable additions include `deploy.yml` (Kamal), `cache.yml`.
 *   **Database:** Migrations in `db/migrate/`. Schema files for different databases (`db/schema.sql`, `db/cache_schema.rb`). Seeds in `db/seeds.rb`.
