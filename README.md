# Exodus90 Application

This is a Next.js project using Payload CMS for content management.
Ok,
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Payload CMS Collections

The application uses several collections to manage content:

### Exercises

- Main exercise collection
- Fields:
  - name (text, required)
  - description (rich text)
  - slug (text, required, unique)

### Versions

- Versions of exercises
- Fields:
  - name (text, required, unique)
  - exercise (relationship to exercises)
  - description (textarea)
  - isActive (checkbox)

### Days

- Daily content
- Fields:
  - relationType (select: 'week' or 'exercise')
  - week (relationship to weeks)
  - exercise (relationship to exercises)
  - number (number, required)
  - title (text)
  - content (rich text, required)

### Weeks

- Weekly content structure
- Fields:
  - version (relationship to versions)
  - number (number, required)
  - title (text)
  - tasks (array of tasks with title, description, and due date)

### Starting Dates

- Manages exercise start dates
- Fields:
  - exercise (relationship to exercises)
  - version (relationship to versions)
  - startDate (date, required)
  - endDate (date)
  - isActive (checkbox)

### Media

- Media asset management
- Fields:
  - alt (text, required)
  - upload capabilities enabled

### Users

- User management
- Authentication enabled
- Fields:
  - email (default)
  - Additional auth-related fields

## Getting Started

```bash
npm install

docker compose -f docker-compose-db.yml up -d // run postgres docker container

npx prisma db push  // push current schema to database
npx payload migrate

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Basic Payload flow

1. Open admin section [http://localhost:3000/admin](http://localhost:3000/admin) and create new account.
2. Create `Exercise`
3. Create `Version`
4. Create `Week`
5. Create `Day`

## Development Workflow

We follow a structured Git branching strategy integrated with standard-version for release management and Coolify for deployments.

### Branch Structure

- `master` - Production branch, reflects the live production state
- `develop` - Development branch, integration branch for features
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation branches
- `hotfix/*` - Urgent production fix branches

### Daily Development Flow

1. Create a new feature branch from develop:

   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

2. Make changes using conventional commits:

   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve edge case"
   git commit -m "docs: update documentation"
   ```

   Commit types:

   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Adding/updating tests
   - `perf:` - Performance improvements
   - `chore:` - Maintenance tasks

3. Push your feature and create a PR to develop:
   ```bash
   git push origin feature/your-feature-name
   ```

### Release Process

1. Create a release branch:

   ```bash
   git checkout develop
   git checkout -b release/next-version
   ```

2. Run the release script:

   ```bash
   npm run release
   ```

   This will:

   - Bump version in package.json
   - Update CHANGELOG.md
   - Create a git tag

3. Merge to main and develop:

   ```bash
   # Merge to main
   git checkout main
   git merge release/next-version
   git push origin main
   git push --tags

   # Merge back to develop
   git checkout develop
   git merge release/next-version
   git push origin develop
   ```

### Hotfix Process

For urgent production fixes:

1. Create hotfix branch:

   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   ```

2. Make your fix:

   ```bash
   git commit -m "fix: resolve critical issue"
   ```

3. Run patch release:

   ```bash
   npm run release -- --release-as patch
   ```

4. Merge to main and develop:

   ```bash
   # Merge to main
   git checkout main
   git merge hotfix/critical-fix
   git push origin main
   git push --tags

   # Merge to develop
   git checkout develop
   git merge hotfix/critical-fix
   git push origin develop
   ```

### Release Commands

Available npm scripts for releases:

```bash
npm run release           # Standard release
npm run release:major    # Major version bump
npm run release:minor    # Minor version bump
npm run release:patch    # Patch version bump
```

### Deployment

We use Coolify for deployments:

- DEV environment: Automatically deploys from `develop` branch
- PROD environment: Automatically deploys from `master` branch

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Run tests
npm run test

# Format code
npm run format

# Lint code
npm run lint
```

## License

Private - All Rights Reserved
