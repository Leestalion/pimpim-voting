# Backend Scripts and Deployment

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run migrate`

Runs the latest database migrations in the development environment.

```bash
npm run migrate
```

### `npm run make <migration_name>`

Creates a new migration file with the specified name in the development environment.

```bash
npm run make <migration_name>
```

### `npm run dev`

Runs the app in the development mode using `nodemon`.

```bash
npm run dev
```

### `npm run build`

Builds the app for production using `webpack`.

```bash
npm run build
```

### `npm start`

Runs the built app in the production environment.

```bash
npm start
```

## Deployment with Fly.io

To deploy the app using Fly.io, you can use the provided GitHub Actions workflow. The deployment can be triggered by pushing to the `main` branch.

### Standard Deployment

To deploy the app without rolling back migrations, simply push your changes to the `main` branch.

### Deployment with Rollback

To deploy the app and roll back all migrations, push your changes to the `main` branch with the environment variable `ROLLBACK_MIGRATIONS` set to `true`.

```yaml
- run: flyctl deploy --remote-only
    env:
        FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
        ROLLBACK_MIGRATIONS: true
```

This will trigger the rollback of all migrations before deploying the app.
