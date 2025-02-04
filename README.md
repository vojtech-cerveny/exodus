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

## Payload flow

1. Open admin section [http://localhost:3000/admin](http://localhost:3000/admin) and create new account.
2. Create `Exercise`
3. Create `Version`
4. Create `Week`
5. Create `Day`

You can check the testing page of it http://localhost:3000/exodus/payload
