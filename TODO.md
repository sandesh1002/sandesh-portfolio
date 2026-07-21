# Deploy Sandesh Portfolio — TODO

## 🔧 Phase 0: Fix Backend Build Error (Exited with status 1 on Render)

**Root cause:** The backend crashed because `MONGODB_URI` was missing or the MongoDB connection wasn't awaited, causing an unhandled promise rejection that exits Node.js with code 1.

### ✅ Changes made:

- [x] **`backend/src/index.js`** — Added startup validation (exits early if `MONGODB_URI` is missing), `async` server start with proper `try/catch`, and graceful shutdown (SIGTERM/SIGINT handlers)
- [x] **`backend/package.json`** — Added `"engines":{"node":">=18.0.0"}` and `prestart` script to validate `MONGODB_URI` before startup
- [x] **`backend/.env.example`** — Created to document all required environment variables

### ⚠️ After pushing, verify these env vars are set on Render:

| Variable | Required? | Description |
|----------|-----------|-------------|
| `MONGODB_URI` | ✅ **Required** | MongoDB Atlas connection string |
| `GMAIL_USER` | ❌ Optional | Gmail address for sending emails |
| `GMAIL_APP_PASSWORD` | ❌ Optional | Gmail App Password |
| `OWNER_EMAIL` | ❌ Optional | Email to receive contact notifications |
| `FRONTEND_URL` | ❌ Optional | Frontend domain for CORS |

---

## ✅ Phase 1: Push Code to GitHub

- [ ] Go to GitHub → Create a new repository (e.g. `sandesh-portfolio`)
- [ ] Run these commands in the project root:
  ```bash
  git add .
  git commit -m "Fix backend startup: validate env vars, await MongoDB, graceful shutdown"
  git remote add origin https://github.com/YOUR_USERNAME/sandesh-portfolio.git
  git branch -M main
  git push -u origin main
  ```

---

## ✅ Phase 2: Deploy Backend to Render

1. Go to [https://dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `sandesh-portfolio-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Add **Environment Variables** (click "Advanced" → "Add Environment Variable"):

   | Variable | Value |
   |----------|-------|
   | `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority` |
   | `GMAIL_USER` | `sandeshjadhavv1002@gmail.com` |
   | `GMAIL_APP_PASSWORD` | *(your Gmail App Password)* |
   | `OWNER_EMAIL` | `sandeshjadhavv1002@gmail.com` |
   | `FRONTEND_URL` | *(set after Vercel deploy — will be `https://your-domain.vercel.app`)* |
5. Click **Create Web Service**

⚠️ **Important:** Get MongoDB Atlas free tier first → [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)

---

## ✅ Phase 3: Deploy Frontend to Vercel

1. Go to [https://vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repository
3. Configure:
   - **Root Directory:** `frontend` (⚠️ important — must select this)
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add **Environment Variable**:

   | Variable | Value |
   |----------|-------|
   | `VITE_API_URL` | `https://sandesh-portfolio-backend.onrender.com` *(or your Render URL)* |
5. Click **Deploy**

---

## ✅ Phase 4: Update CORS

- [ ] After Vercel deploy, copy your Vercel domain (e.g. `https://portfolio-abc.vercel.app`)
- [ ] Go to Render Dashboard → your backend service → **Environment**
- [ ] Update `FRONTEND_URL` to your Vercel domain
- [ ] Click **Save Changes** → **Manual Deploy** → **Deploy latest commit**

---

## ✅ Phase 5: Verify

- [ ] Visit your Vercel frontend URL
- [ ] Test the contact form with a sample message
- [ ] Check MongoDB Atlas for the saved message
- [ ] Check your Gmail inbox for the notification email

---

## 🔄 Redeploying After Changes

- **Frontend:** Push to GitHub → Vercel auto-deploys
- **Backend:** Push to GitHub → Render auto-deploys

