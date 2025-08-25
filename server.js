// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) console.warn('⚠️ OPENAI_API_KEY not set. Create server/.env with OPENAI_API_KEY=your_key');

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('/api/health', (_req,res)=> res.json({ok:true}));

app.post('/api/correct', async (req,res)=>{
  try{
    if(!OPENAI_API_KEY) return res.status(400).json({error:'OPENAI_API_KEY missing'});
    const body = req.body || {};
    if(!body.model) body.model = 'gpt-4o-mini';
    if(!body.messages) body.messages = [{role:'user', content:'Halo'}];
    const response = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${OPENAI_API_KEY}`},
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if(!response.ok) return res.status(response.status).json(data);
    res.json(data);
  }catch(err){
    console.error(err);
    res.status(500).json({error:String(err.message||err)});
  }
});

app.listen(PORT, ()=>{
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`ℹ️ Static from ${publicPath}`);
});