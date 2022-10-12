### Setting up the app locally

- After cloning the repository locally
- `docker-compose up -d` to start docker images of pg and redis databases
- setup and run the rails server
  - `cd api`
  - `bundle install`
  - `bin/rails db:migrate`
  - `bin/rails server`
- Setup and run the react client
  - `cd front`
  - `npm install` usse --legacy-peer-deps if needed
  - `npm run dev`

That is all.
