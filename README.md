# AMFI Portfolio Tracker

Simple mutual fund portfolio tracker that loads AMFI NAV data through a backend proxy and calculates portfolio value.

## What was fixed

- Added a backend API proxy (`/api/nav`) to avoid browser-side CORS issues.
- Added a health endpoint (`/health`) for deploy checks.
- Switched frontend to use backend API instead of direct AMFI fetch.
- Improved error handling when NAV data is unavailable.
- Cleaned up fund parsing and selection validation.
- Fixed currency rendering issues by using plain `Rs` text.

## Local run

1. Install dependencies:
   - `npm install`
2. Start server:
   - `npm start`
3. Open:
   - `http://localhost:3000`

## Railway deployment

1. Push this project to a GitHub repository.
2. In Railway, create a new project and choose **Deploy from GitHub repo**.
3. Railway will detect Node.js automatically from `package.json`.
4. No extra start command is needed (`npm start` is already configured).
5. After deploy, verify:
   - `/health` returns `{"status":"ok"}`
   - main page loads and fund list populates.

## Files added for deployment

- `server.js` (Express server + AMFI proxy)
- `package.json` (Node app metadata and start script)
