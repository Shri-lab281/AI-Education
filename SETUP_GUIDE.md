# 🚀 Quick Start Guide - AI Education Platform

## By Shrishti Barsaiyan - AI in Education

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```powershell
# From project root
npm run install-all
```

### Step 2: Setup Supabase Database

1. **Create Supabase Project:**
   - Go to https://supabase.com/
   - Click "New Project"
   - Name: `ai-education-platform`
   - Set database password (SAVE IT!)
   - Choose region
   - Wait 2-3 minutes

2. **Run Database Schema:**
   - Supabase Dashboard → SQL Editor → New Query
   - Copy ALL from [server/src/config/schema.sql](server/src/config/schema.sql)
   - Paste and click "Run"
   - Verify: Table Editor shows 10 tables

3. **Get API Keys:**
   - Project Settings → API
   - Copy: Project URL, anon key, service_role key

### Step 3: Configure Environment

**Server (.env):**
```powershell
cd server
cp .env.example .env
```

Edit `server/.env` with your Supabase credentials:
```env
SUPABASE_URL=your_url_here
SUPABASE_SERVICE_ROLE_KEY=your_key_here
JWT_SECRET=generate_random_string
```

**Client (.env):**
```powershell
cd ../client
cp .env.example .env
```

### Step 4: Start Development

```powershell
# From root directory
npm run dev
```

🎉 Open http://localhost:5173

---

## 📝 First Steps After Setup

### Create Your Account

1. Navigate to http://localhost:5173
2. Click "Register now"
3. Fill in:
   - Full Name: Your name
   - Email: your@email.com
   - Password: (min 6 characters)
   - Grade Level: Select yours
   - School (optional)
4. Click "Create Account"

### Explore Features

#### 1. Create Learning Path
- Click "Learning Path" in sidebar
- Select subjects: Mathematics, Science, etc.
- Add weak topics: "Algebra, Physics"
- Set exam date (optional)
- Click "Generate Study Plan"
- View AI-generated personalized schedule!

#### 2. Ask a Doubt
- Click "Doubt Solver"
- Choose subject
- Ask: "Explain photosynthesis in simple terms"
- Get instant AI explanation with practice questions!

#### 3. Submit Assignment
- Click "Assignments"
- Title: "My First Essay"
- Subject: English
- Paste your text
- Click "Submit for Evaluation"
- Receive instant AI feedback and score!

#### 4. Track Performance
- Click "Performance"
- Add test scores
- View analytics graph
- Get improvement recommendations

---

## 🎓 Use Cases Demo

### Use Case 1: Personalized Learning

**Student Request:**
> "Help me prepare for my exams in Math and Science. I am weak in algebra and physics."

**What AI Generates:**
- ✅ 7-day personalized study plan
- ✅ Topic difficulty breakdown (Easy 30%, Medium 50%, Hard 20%)
- ✅ Daily schedule with time allocation
- ✅ Recommended resources (videos, notes, practice)
- ✅ Revision strategy with spaced repetition

### Use Case 2: Doubt Solving

**Student Question:**
> "Explain Newton's Laws of Motion in simple way and give me 3 practice questions."

**AI Response:**
- ✅ Step-by-step explanation in simple language
- ✅ Key concepts highlighted
- ✅ 2 solved examples
- ✅ 3 practice questions (Easy, Medium, Hard)
- ✅ Diagram descriptions

### Use Case 3: Assignment Evaluation

**Student Submits:** English essay on "Climate Change"

**AI Provides:**
- ✅ Score: 78/100
- ✅ Grammar corrections with line numbers
- ✅ Content feedback (strengths + improvements)
- ✅ Structure suggestions
- ✅ Highlighted mistakes
- ✅ 5 improvement tips
- ✅ Plagiarism score: 95% original

### Use Case 4: Performance Prediction

**Student Adds:** Last 5 test scores

**AI Predicts:**
- ✅ Weak chapters: Algebra, Physics Motion
- ✅ Strong chapters: Grammar, History
- ✅ Decline patterns detected
- ✅ Risk level: Moderate
- ✅ 5 specific recommendations for improvement

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
- Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in `server/.env`
- Verify Supabase project status is "Healthy"
- Restart server: `npm run dev`

### Issue: "Port 5000 already in use"
**Solution:**
```powershell
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <number> /F

# Or change port in server/.env
PORT=5001
```

### Issue: "Failed to fetch"
**Solution:**
- Ensure backend is running on http://localhost:5000
- Check `client/.env` has `VITE_API_URL=http://localhost:5000/api`
- Restart both servers

### Issue: "JWT token invalid"
**Solution:**
- Logout and login again
- Clear browser localStorage
- Generate new JWT_SECRET in `server/.env`

---

## 📊 Database Tables Created

Your Supabase database now has:

1. **users** - Student and admin accounts
2. **subjects** - Available subjects with metadata
3. **learning_paths** - Personalized study plans
4. **doubt_queries** - Question-answer history
5. **assignments** - Submitted work and evaluations
6. **exam_plans** - Exam preparation schedules
7. **performance_data** - Test scores and predictions
8. **study_sessions** - Learning activity tracking
9. **resources** - Educational materials
10. **analytics** - Platform-wide metrics

---

## 🌐 Deployment Checklist

### Before Deploying:

- [ ] Test all features locally
- [ ] Verify database schema is complete
- [ ] Generate strong JWT_SECRET
- [ ] Set NODE_ENV=production

### Deploy to Render (Backend):

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Build: `cd server && npm install`
5. Start: `cd server && npm start`
6. Add environment variables
7. Deploy

### Deploy to Vercel (Frontend):

1. Import project from GitHub
2. Root Directory: `client`
3. Build: `npm run build`
4. Output: `dist`
5. Add `VITE_API_URL` env variable
6. Deploy

### After Deployment:

- [ ] Test login/register
- [ ] Create test learning path
- [ ] Submit test assignment
- [ ] Verify API endpoints work
- [ ] Update README with live URLs

---

## 💡 Pro Tips

### For Better AI Responses:

1. **OpenAI Integration (Optional):**
   - Get API key from https://platform.openai.com/
   - Add to `server/.env`: `OPENAI_API_KEY=sk-...`
   - Restart server for enhanced AI features

2. **Without OpenAI:**
   - Project works with built-in mock AI
   - Provides intelligent responses
   - No API key required

### For Development:

- Use separate terminals for frontend/backend
- Check browser console for errors
- Monitor server logs for API issues
- Use Supabase Dashboard to view database

### For Students:

- Create learning paths for exam preparation
- Ask doubts regularly for practice
- Submit assignments for instant feedback
- Track performance weekly

---

## 📧 Need Help?

If you encounter issues:

1. Check this guide first
2. Review error messages carefully
3. Check [README.md](README.md) for detailed docs
4. Verify all environment variables
5. Ensure Supabase project is healthy

---

## 🎉 Success Indicators

You're all set when you can:

- ✅ Register and login successfully
- ✅ Create a learning path and see AI plan
- ✅ Ask a doubt and get AI explanation
- ✅ Submit assignment and receive evaluation
- ✅ Add performance data and view analytics
- ✅ Access admin dashboard (if admin)

---

## 📚 Next Steps

1. **Customize Subjects:**
   - Edit subject lists in components
   - Add more subjects to database

2. **Enhance AI:**
   - Add OpenAI API key for better responses
   - Customize AI prompts in `aiService.js`

3. **Add Features:**
   - Video chat with AI tutor
   - Real-time collaborative learning
   - Mobile app version
   - Gamification and rewards

4. **Scale:**
   - Deploy to production
   - Monitor with analytics
   - Collect user feedback
   - Iterate and improve

---

**Happy Learning! 🎓✨**

*Built with ❤️ by Shrishti Barsaiyan - AI in Education*
