# ClipCulture (Monorepo)

- **frontend/** — ClipCulture Front-end (React + Vite) → Netlify
- **backend/** — ClipCulture Back-end (Django, Python 3) → Railway

## Local Dev

### Frontend first (mock data):
```bash
npm run dev:frontend
# open http://localhost:5173
```

### Backend placeholder (health only):
```bash
cd backend
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
# GET http://localhost:8000/health/ → {"ok": true, "service": "backend"}
```
