# Backend untuk Render.com (Node/Express)

Langkah cepat:
1) Push folder ini ke repo GitHub baru (misal: translator-backend).
2) Buka https://render.com → New + → Web Service → Connect repo `translator-backend`.
3) Build Command: `npm install`
4) Start Command: `npm start`
5) Environment Variables: tambahkan `OPENAI_API_KEY` (isi dengan API key OpenAI kamu).
6) Tunggu deploy selesai, catat URL (contoh: https://translator-backend.onrender.com).
7) Kembali ke Frontend (GitHub Pages), edit `index.html` dan set:
   const API_PROXY_URL = "https://YOUR-BACKEND-URL/api/correct";

Catatan:
- **Jangan** upload file `.env` ke GitHub.
- Server sudah otomatis pakai `process.env.PORT`, jadi kompatibel di Render.
