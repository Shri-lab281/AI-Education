# AI Education Platform

> AI-Powered Educational Platform with Personalized Learning, Intelligent Tutoring, Automated Assessment, and Performance Analytics

## 🎯 Features

### 1. **AI Personalized Learning Assistant**
- Creates custom learning paths for each student
- Generates personalized study plans based on strengths and weaknesses
- Topic difficulty breakdown and daily revision schedules
- Recommended videos, notes, and practice questions

### 2. **AI Doubt Solver / Tutor Bot**
- 24/7 digital tutor across all subjects
- Step-by-step explanations with diagrams
- Concept-based quizzes and solved examples
- Voice-based explanations

### 3. **Automated Assignment Evaluator**
- Evaluates typed and handwritten assignments
- Provides grammar corrections and content improvement tips
- Plagiarism detection
- Rubric-based evaluation with detailed feedback

### 4. **AI Exam Preparation Assistant**
- Creates smart 7-day revision plans
- Generates topic-wise tests and flashcards
- Mock tests with question predictions
- Study reminders and difficulty-wise strategies

### 5. **Student Performance Predictor**
- Analyzes test scores to identify weak areas
- Detects patterns of decline
- Predicts students who need extra support
- Provides actionable insights for teachers

---

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- TailwindCSS for styling
- Axios for API calls
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express
- Supabase PostgreSQL database
- JWT authentication
- RESTful API architecture

### AI Integration
- OpenAI GPT-4 for tutoring and explanations
- Google Gemini for content generation
- NLP processing for text analysis

### Deployment
- Vercel (Frontend)
- Render (Backend)
- Supabase (Database)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Supabase account
- OpenAI API key
- Git installed

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd ai-education-platform
```

### Step 2: Install Dependencies
```bash
npm run install-all
```

### Step 3: Configure Environment Variables
Create `.env` file in the root directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_key
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret
```

### Step 4: Set Up Database
1. Create a Supabase project
2. Run the SQL schema from `server/src/config/schema.sql`
3. Verify tables are created

### Step 5: Run Development Server
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🗂️ Project Structure

```
ai-education-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Helper functions
│   │   └── App.jsx
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Database & configs
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & validation
│   │   ├── services/      # AI & business logic
│   │   └── server.js
│   └── package.json
├── .env.example
└── README.md
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Backend (Render)
1. Create new Web Service
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add all environment variables
5. Deploy

---

## 📊 API Endpoints

### Student Endpoints
- `POST /api/learning-path` - Generate personalized learning path
- `POST /api/doubt-solver` - Ask doubt to AI tutor
- `POST /api/evaluate-assignment` - Submit assignment for evaluation
- `POST /api/exam-prep` - Create exam preparation plan
- `GET /api/performance/:studentId` - Get performance analytics

### Admin Endpoints
- `GET /api/admin/students` - Get all students
- `GET /api/admin/analytics` - Get platform analytics
- `PUT /api/admin/subjects` - Manage subjects

---

## 🧪 Testing

Run functional tests:
```bash
npm test
```

---

## 📝 License

MIT License - feel free to use this project for learning and development.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📧 Support

For support, email admin@education.com or open an issue in the repository.
