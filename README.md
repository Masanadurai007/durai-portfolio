# Durai Portfolio — Masana Durai M

A production-ready freelance portfolio for a Fullstack Developer & AI Engineer, featuring **"Durai"** — a real LangGraph + LangChain chat agent that speaks as Masana, answers visitor questions grounded in his real background, and captures leads conversationally.

See the `ui-screenshots/` folder for reference images of every section before you run anything.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Tailwind CSS |
| Backend | Python FastAPI |
| AI Agent | LangChain + LangGraph (free Groq API) |
| Database | PostgreSQL |
| Migrations | Alembic |

---

## Project structure

```
durai-portfolio/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entrypoint
│   │   ├── core/
│   │   │   └── config.py        # Settings / env config
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic
│   │   ├── repository/          # Database access layer
│   │   ├── models/               # SQLAlchemy ORM models
│   │   ├── schemas/              # Pydantic request/response schemas
│   │   ├── agents/               # LangGraph "Durai" chat agent
│   │   └── database/             # DB session/engine setup
│   ├── migrations/                # Alembic migrations
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── create_database.sql
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/           # All page sections + chat + nav
│   │   ├── data/content.js       # ALL site text/content lives here
│   │   ├── hooks/
│   │   ├── lib/api.js            # Backend API client
│   │   └── App.jsx
│   ├── public/                   # index.html, SEO files, favicon
│   ├── package.json
│   └── .env.example
└── ui-screenshots/                # Reference images of every section
```

---

## Prerequisites

Install these before you start:

1. **Node.js** v18+ — [nodejs.org](https://nodejs.org)
2. **Python** 3.11+ — [python.org](https://python.org)
3. **PostgreSQL** v14+ — [postgresql.org/download](https://www.postgresql.org/download/)
4. **VS Code** with the **Python** and **ES7+ React** extensions

---

## Step-by-step: running in VS Code

### 1. Open the project

Unzip the folder, then in VS Code: `File → Open Folder` → select `durai-portfolio`.
Open a terminal: `` Terminal → New Terminal `` (you'll run frontend and backend in two separate terminals).

---

### 2. Set up PostgreSQL

Open a terminal and log into Postgres:

```bash
psql -U postgres
```

Then create the database:

```sql
CREATE DATABASE durai_portfolio;
\q
```

(Or just run: `psql -U postgres -f backend/create_database.sql`)

---

### 3. Backend setup

In a VS Code terminal:

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configure environment variables** — open `backend/.env` (already created from `.env.example`) and edit:

```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/durai_portfolio
DATABASE_URL_SYNC=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/durai_portfolio
GROQ_API_KEY=your_groq_api_key_here
```

> **Get a free Groq API key (no credit card needed):**
> Go to [console.groq.com/keys](https://console.groq.com/keys) → sign up → "Create API Key" → paste it into `.env` as `GROQ_API_KEY`.
> This powers Durai's chat responses for free.

**Run the database migrations:**

```bash
alembic upgrade head
```

This creates the `leads` and `chat_messages` tables.

**Start the backend server:**

```bash
uvicorn app.main:app --reload --port 8000
```

Backend is now running at **http://localhost:8000**
Check it works: open **http://localhost:8000/docs** — you should see the FastAPI Swagger UI with `/chat`, `/leads`, and `/health` endpoints.

---

### 4. Frontend setup

Open a **second terminal** in VS Code (keep the backend running in the first):

```bash
cd frontend
npm install
```

The `frontend/.env` file is already set up to point at `http://localhost:8000/api/v1` — no changes needed for local development.

**Start the frontend:**

```bash
npm start
```

The site opens automatically at **http://localhost:3000**

---

### 5. Try it out

- Scroll through all sections: Home, About, Skills, Services, Works, Experience, Writing, Contact
- Click the **WhatsApp icon** (bottom-left) — opens WhatsApp with a pre-filled message
- Click the **chat bubble** (bottom-right) — talk to **Durai**, the LangGraph agent. Try:
  - "What does Durai work on?"
  - "Can you build a RAG chatbot for my product?"
  - "I'm Priya, my email is priya@company.com, I need an AI agent built" → watch it capture a lead
- Submit the **Contact form** — check it lands in your Postgres `leads` table:
  ```sql
  SELECT * FROM leads;
  ```

---

## Editing content

All site text (name, projects, skills, services, experience, achievements, articles) lives in one file:

```
frontend/src/data/content.js
```

Edit that file and the whole site updates — no need to touch component files for text changes.

To add your real photo: replace the placeholder block in `frontend/src/components/Hero.jsx` (search for the comment `Replace this block with`) with an `<img>` tag pointing at a photo placed in `frontend/public/`.

To edit what Durai (the chatbot) knows about you: edit
```
backend/app/agents/knowledge_base.py
```

---

## Deployment notes

- **Frontend** → deploy the `frontend` folder to Vercel or Netlify. Set the environment variable `REACT_APP_API_URL` to your deployed backend URL.
- **Backend** → deploy to Render, Railway, or any host supporting Python + PostgreSQL. Set all `.env` variables in your host's dashboard. Run `alembic upgrade head` once after deploying.
- **Database** → use a managed Postgres instance (Render, Railway, Neon, or Supabase all have free tiers).
- Update `ALLOWED_ORIGINS` in the backend `.env` to your live frontend URL once deployed (CORS).
- Update the canonical URL and Open Graph URLs in `frontend/public/index.html` and `sitemap.xml` to your real domain once deployed, for SEO.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `alembic upgrade head` fails to connect | Check Postgres is running and `DATABASE_URL_SYNC` credentials are correct |
| Chat replies with "AI backend isn't fully configured" | Add a valid `GROQ_API_KEY` to `backend/.env` and restart uvicorn |
| Frontend shows CORS errors | Make sure `ALLOWED_ORIGINS` in `backend/.env` includes `http://localhost:3000` |
| `npm start` fails | Delete `node_modules` and `package-lock.json`, then `npm install` again |

---

Built for **Masana Durai M** — Fullstack Developer & AI Engineer, Chennai, India.
