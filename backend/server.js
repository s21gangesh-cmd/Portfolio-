import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/certificates", express.static(path.join(__dirname, "public/certificates")));

function readSkills(){return JSON.parse(fs.readFileSync(path.join(__dirname,"data/skills.json"),"utf8"));}

app.get("/api/health",(req,res)=>res.json({ok:true,service:"portfolio-api"}));
app.get("/api/skills",(req,res)=>res.json(readSkills()));
app.get("/api/skills/:id",(req,res)=>{const skill=readSkills().find(s=>s.id===req.params.id); if(!skill)return res.status(404).json({error:"Skill not found"}); res.json(skill);});

app.listen(PORT,()=>console.log("Portfolio API running on http://localhost:"+PORT));