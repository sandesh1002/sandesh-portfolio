# Deploy Sandesh Portfolio — TODO

## ✅ Phase 1: Push Code to GitHub

- [ ] Create a GitHub repository (if not already done)
- [ ] Remove `node_modules/` and `dist/` from tracking (already in `.gitignore`)
- [ ] Add, commit, and push:
  ```bash
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
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

