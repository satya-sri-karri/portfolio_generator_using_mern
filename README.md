# 🚀 AI Portfolio Generator — MERN Stack

A full-stack **MERN** application where developers can register, login, and generate beautiful shareable portfolio websites.



| Feature | Description |
|---------|-------------|
| 🔐 **Auth** | Register & Login with JWT + bcrypt |
| 🎓 **Certifications** | Add courses, credentials with verification links |
| 🏆 **Achievements** | Awards, hackathons, publications |
| 💻 **Coding Profiles** | LeetCode, Codeforces, HackerRank, GitHub with ratings |
| 📤 **Share Links** | Each portfolio gets a unique public URL |
| ✏ **Edit Mode** | Update existing portfolios anytime |
| 📊 **Dashboard** | Manage all portfolios with view counts |
| 🗑 **Delete** | Remove portfolios from dashboard |

---

## 🗂 Folder Structure

```
ai-portfolio-generator-v2/
├── package.json                        ← Root scripts
│
├── backend/
│   ├── server.js                       ← Express entry point
│   ├── package.json
│   ├── .env.example
│   ├── middleware/
│   │   └── auth.js                     ← JWT verification middleware
│   ├── models/
│   │   ├── User.js                     ← User schema (bcrypt)
│   │   └── Portfolio.js                ← Full portfolio schema
│   └── routes/
│       ├── auth.js                     ← /api/auth (register, login, me)
│       └── portfolio.js                ← /api/portfolio (CRUD + share)
│
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.jsx                     ← Router + all routes
        ├── index.js
        ├── index.css                   ← All styles (pure CSS, no Tailwind)
        ├── context/
        │   ├── AuthContext.js          ← JWT + user global state
        │   └── ThemeContext.js         ← 4 themes via CSS variables
        ├── hooks/
        │   └── usePortfolioForm.js     ← All form state management
        ├── utils/
        │   └── api.js                  ← All fetch() calls to backend
        ├── pages/
        │   ├── LandingPage.jsx         ← Homepage for visitors
        │   ├── RegisterPage.jsx        ← Sign up
        │   ├── LoginPage.jsx           ← Sign in
        │   ├── DashboardPage.jsx       ← Manage portfolios
        │   ├── BuilderPage.jsx         ← 9-step form (create + edit)
        │   ├── PortfolioPage.jsx       ← Public portfolio view
        │   └── PreviewPage.jsx         ← Live preview tab
        └── components/
            ├── shared/
            │   ├── Navbar.jsx
            │   ├── StepIndicator.jsx
            │   └── ProtectedRoute.jsx  ← Guards dashboard/builder
            ├── form/
            │   └── FormSteps.jsx       ← All 9 step components
            └── portfolio/
                └── PortfolioSections.jsx ← All portfolio sections
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router v6 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Styling** | Pure CSS with CSS Variables (no Tailwind) |
| **HTTP** | Native `fetch()` API (no Axios) |


---

Setup

### Step 1 — Install dependencies
```bash
npm run install:all
```

### Step 2 — Create backend `.env`
```bash
copy backend\.env.example backend\.env
notepad backend\.env
```

Fill in your values:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-app
PORT=5000
JWT_SECRET=make_this_a_long_random_string_like_this_abc123xyz789
FRONTEND_URL=http://localhost:3000
```

### Step 3 — Start both servers
```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## 📡 API Reference

### Auth Routes
| Method | Endpoint | Body | Auth |
|--------|----------|------|------|
| POST | `/api/auth/register` | `{ name, email, password }` | ❌ |
| POST | `/api/auth/login` | `{ email, password }` | ❌ |
| GET | `/api/auth/me` | — | ✅ Bearer token |

### Portfolio Routes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/portfolio` | ✅ | Create portfolio |
| GET | `/api/portfolio/my` | ✅ | Get user's portfolios |
| GET | `/api/portfolio/:id` | ✅ | Get one (owner only) |
| PUT | `/api/portfolio/:id` | ✅ | Update portfolio |
| DELETE | `/api/portfolio/:id` | ✅ | Delete portfolio |
| GET | `/api/portfolio/share/:slug` | ❌ | **Public share link** |

---

## 📤 How to Share a Portfolio

After creating a portfolio, you get a unique URL like:
```
http://localhost:3000/p/john-doe-abc123
```

### Ways to share:
1. **Copy link** from the Dashboard card and paste anywhere
2. **Add to your LinkedIn** About section or Featured links
3. **Put in your resume** as "Portfolio: yourlink.com"
4. **Share on WhatsApp / Twitter** directly
5. **Include in job applications** and cold emails

When deployed to a cloud platform (like Vercel + Railway), the URL becomes:
```
https://your-app.vercel.app/p/your-name-abc123
```

---

## 🎨 Themes

| Theme | Accent | Vibe |
|-------|--------|------|
| `dark` | Indigo | Deep midnight |
| `light` | Indigo | Clean professional |
| `ocean` | Sky blue | Deep sea |
| `forest` | Green | Lush nature |

---

## 🔐 JWT Secret Tips

For production, generate a strong secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Paste the output as your `JWT_SECRET` in `.env`.

---

## 🚀 Deployment

### Backend → Railway or Render
1. Push `backend/` to GitHub
2. Connect to Railway/Render
3. Set environment variables: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`
4. Deploy

### Frontend → Vercel or Netlify
1. In `frontend/package.json`, change proxy to your backend URL
2. Or set `REACT_APP_API_URL=https://your-backend.railway.app/api`
3. In `api.js` change: `const BASE = process.env.REACT_APP_API_URL || "/api";`
4. Run `npm run build` and deploy the `build/` folder
