# 🚀 Quick Start - 5 Minute Setup

## AI Education Platform by Shrishti Barsaiyan

---

## ⚡ Super Quick Setup

### 1️⃣ Install (2 minutes)
```powershell
# Run this from project root
setup.bat
```
OR
```powershell
npm install
cd server && npm install
cd ../client && npm install
```

### 2️⃣ Create Supabase Project (3 minutes)
1. Go to https://supabase.com/ → Sign up (free)
2. Click "New Project"
3. Name: `ai-education-platform`
4. Set database password (SAVE IT!)
5. Choose region → Create

### 3️⃣ Setup Database (1 minute)
1. Supabase Dashboard → SQL Editor
2. Copy all from [server/src/config/schema.sql](server/src/config/schema.sql)
3. Paste → Click "Run"
4. Verify: Table Editor shows 10 tables ✅

### 4️⃣ Configure Environment (1 minute)

**Get Supabase Keys:**
- Project Settings → API
- Copy: Project URL, service_role key

**Create server/.env:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=any_random_string_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Create client/.env:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 5️⃣ Start Development (30 seconds)
```powershell
npm run dev
```

🎉 Open http://localhost:5173

---

## 📝 First Steps

### Register Account
1. Click "Register now"
2. Fill form:
   - Name: Your name
   - Email: your@email.com
   - Password: test123 (min 6 chars)
   - Grade: Select yours
3. Click "Create Account"

### Try Features

**📚 Learning Path:**
- Sidebar → Learning Path
- Select: Math, Science
- Weak topics: Algebra, Physics
- Generate Plan → See AI schedule!

**❓ Ask Doubt:**
- Sidebar → Doubt Solver
- Subject: Science
- Question: "Explain photosynthesis"
- Submit → Get AI explanation!

**📝 Submit Assignment:**
- Sidebar → Assignments
- Title: "My Essay"
- Subject: English
- Paste text → Submit
- Get instant AI feedback!

---

## 🔧 Commands Cheat Sheet

```powershell
# Install all dependencies
npm run install-all

# Start both servers
npm run dev

# Start backend only
cd server && npm run dev

# Start frontend only
cd client && npm run dev

# Test backend
curl http://localhost:5000/api/health

# Build for production
npm run build
```

---

## 📊 Project Structure

```
ai-education-platform/
├── client/          → React frontend
│   ├── src/
│   │   ├── pages/   → Login, Dashboard, etc.
│   │   └── utils/   → API calls
│   └── package.json
│
├── server/          → Node.js backend
│   ├── src/
│   │   ├── routes/  → API endpoints
│   │   ├── controllers/ → Logic
│   │   └── config/  → Database schema
│   └── package.json
│
└── docs/            → Documentation
    ├── README.md
    ├── SETUP_GUIDE.md
    └── More...
```

---

## 🎯 Features Overview

| Feature | Page | Description |
|---------|------|-------------|
| 📚 Learning Path | `/learning-path` | AI study plans |
| ❓ Doubt Solver | `/doubt-solver` | 24/7 AI tutor |
| 📝 Assignments | `/assignments` | Auto-grading |
| 📊 Performance | `/performance` | Track progress |
| 👤 Dashboard | `/dashboard` | Student home |
| 🔐 Admin | `/admin` | Teacher panel |

---

## 🐛 Quick Fixes

**Port 5000 in use?**
```powershell
netstat -ano | findstr :5000
taskkill /PID <number> /F
```

**Can't connect to DB?**
- Check `server/.env` has correct Supabase URL/key
- Verify Supabase project is "Healthy"

**Frontend not loading?**
- Check `client/.env` has correct API URL
- Ensure backend is running

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Complete guide |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Detailed setup |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Overview |
| [CHECKLIST.md](CHECKLIST.md) | Verification |
| [AI_CAPABILITIES.md](AI_CAPABILITIES.md) | AI features |
| [TECHNOLOGY_STACK.md](TECHNOLOGY_STACK.md) | Tech details |

---

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | React app |
| Backend | http://localhost:5000 | API server |
| Health | http://localhost:5000/api/health | Test API |
| Supabase | https://supabase.com | Database |

---

## 🔐 Default Credentials

**Admin (after running sample-data.sql):**
```
Email: admin@aieducation.com
Password: admin123
```

**Student:**
```
Register your own account!
```

---

## 💡 Pro Tips

✅ Use `Ctrl+C` to stop servers  
✅ Keep terminals open during development  
✅ Clear browser cache if issues occur  
✅ Check browser console for errors  
✅ Use Supabase Dashboard to view data  

---

## 📧 Need Help?

1. Check error messages in terminal
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. Verify environment variables
4. Restart servers
5. Clear browser cache

---

## ✨ Next Steps

1. **Explore Features** - Try all 5 use cases
2. **Customize** - Modify colors, subjects
3. **Deploy** - Host on Vercel + Render
4. **Enhance AI** - Add OpenAI API key
5. **Expand** - Add new features

---

## 🎉 Success Checklist

- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Environment configured
- [ ] Servers running
- [ ] Can register/login
- [ ] Features working

---

**Ready to revolutionize education with AI!** 🎓✨

*Quick reference for AI Education Platform*
