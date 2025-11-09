# OptimizeList-AI (Render-ready)

## What I changed
- Fixed backend `server.js` to correctly serve the frontend build using a path relative to the backend folder:
  ```js
  const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendDistPath));
  ```
  This resolves incorrect `process.cwd()` assumptions and avoids 404 / MIME issues.
- Added small middleware to explicitly set MIME types for .css/.js as a fallback.
- Added `build` and `start` scripts to the root `package.json`.
- Removed `node_modules` folders and `.git` directory to keep the zip clean. Render will install dependencies during deploy.

## How to deploy on Render
1. Upload this repository zip to a Git provider (GitHub/GitLab) or push the files to a Git repo.
2. Create a new Web Service on Render connected to the repo.
3. Set the build command (optional):
   ```
   npm run build
   ```
   Render will run `npm run build` which builds the frontend and installs backend deps.
4. Set the start command:
   ```
   npm start
   ```
   (This runs `cd backend && npm start` from the root package.json.)
5. Make sure `PORT` is picked from environment (server uses process.env.PORT).

## Notes
- If your frontend expects to be served under `/OptimizeList-AI/` (check `frontend/dist/index.html` links),
  update the frontend base path (Vite `base` or CRA `homepage`) or adjust the server to `app.use('/OptimizeList-AI', express.static(frontendDistPath));` and ensure index.html asset URLs include that prefix.
- If you want me to also build the frontend into `frontend/dist` and include the built files here, I can do that — but it requires running `npm install` and `npm run build`. I cannot run `npm` in this environment due to missing Node toolchain.
