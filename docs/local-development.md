# Local development

## Prerequisites

- Node.js 20 or later
- A Neon PostgreSQL connection string

For an offline local database, start PostgreSQL with `docker compose up -d postgres` and use `postgresql://carebridge:carebridge_local_only@localhost:5432/carebridge` as `DATABASE_URL`.

## Setup

1. Copy `backend/.env.example` to `backend/.env` and add the Neon `DATABASE_URL`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Install packages with `npm install`.
4. Start both applications together with `npm run dev`.

The React application runs on `http://localhost:5173` and calls the Express API at `http://localhost:4000/api`.

## Verification

Open the React application. The landing page's connection card calls `GET /api/health` through Axios and displays a successful API response only when the Express backend is reachable.

Run automated checks with:

```sh
npm run build
npm test
```
