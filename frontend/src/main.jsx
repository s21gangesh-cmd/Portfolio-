import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Github, Linkedin, Mail, ExternalLink, X } from "lucide-react";
import "./styles.css";

const API = "http://localhost:5000/api";
const FALLBACK_SKILLS = [
  ["python","Python","PY","Intermediate",72],["java","Java","JV","Learning",65],
  ["dsa","Data Structures & Algorithms","DS","Actively learning",58],["frontend","HTML / CSS / JavaScript","FE","Intermediate",76],
  ["git","Git / GitHub","GT","Working knowledge",64],["excel","Excel","XL","Working knowledge",68],
  ["cybersecurity","Cybersecurity","CY","Foundation",52],["editing","Video Editing","VE","Intermediate",70]
].map(([id,name,label,level,progress])=>({id,name,label,level,progress}));

function App(){
  const [skills,setSkills]=useState(FALLBACK_SKILLS), [selected,setSelected]=useState(null);
  useEffect(()=>{fetch(API+"/skills").then(r=>r.ok?r.json():Promise.reject()).then(setSkills).catch(()=>{});},[]);
  const openSkill=async(skill)=>{try{const r=await fetch(API+"/skills/"+skill.id); setSelected(r.ok?await r.json():skill);}catch{setSelected(skill);}};
  return <div className="app">
    <header className="nav"><a className="brand" href="#top">GS<span>.</span></a><nav><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></header>
    <main id="top">
      <section className="hero"><div><p className="eyebrow">B.TECH IT · DEVELOPER · BUILDER</p><h1>Hi, I’m <span>Gangesh.</span></h1><p className="lead">I’m an IT engineering student building practical web projects, learning cybersecurity, and turning ideas into working prototypes.</p><div className="actions"><a className="btn primary" href="#projects">View projects</a><a className="btn" href="#contact">Contact me</a></div></div><div className="hero-card"><div className="avatar">GS</div><p>Open to internships, freelance work & collaborations.</p></div></section>
      <section id="about" className="section"><div className="section-title"><span>01</span><h2>About</h2></div><div className="about-grid"><p>I’m a B.Tech Information Technology student focused on developing useful software and strengthening my foundations in programming, data structures, cybersecurity and modern development workflows.</p><div className="facts"><div><b>Education</b><span>B.Tech IT · Your College Name</span></div><div><b>Location</b><span>India</span></div><div><b>Focus</b><span>Development · Cybersecurity · AI-assisted productivity</span></div></div></div></section>
      <section id="skills" className="section"><div className="section-title"><span>02</span><h2>Skills</h2></div><div className="skill-grid">{skills.map(s=><button className="skill" key={s.id} onClick={()=>openSkill(s)}><div className="skill-head"><strong>{s.label||s.name.slice(0,2)}</strong><span>{s.progress}%</span></div><h3>{s.name}</h3><p>{s.level}</p><div className="bar"><i style={{width:(s.progress||0)+"%"}}/></div></button>)}</div></section>
      <section id="projects" className="section"><div className="section-title"><span>03</span><h2>Projects</h2></div><div className="projects"><article><div><small>01 · WEB</small><h3>Cricket Academy Website</h3><p>A responsive academy-focused website with structured sections and a clean user flow.</p><div className="tags"><span>HTML</span><span>CSS</span><span>JavaScript</span></div></div><ExternalLink/></article><article><div><small>02 · WEB</small><h3>Travel Package Website</h3><p>A responsive travel package interface designed to present packages clearly and support enquiries.</p><div className="tags"><span>HTML</span><span>CSS</span><span>JavaScript</span></div></div><ExternalLink/></article><article><div><small>03 · IOT</small><h3>iKwath</h3><p>Smart Automated Kadha Preparation System using ESP32, sensors and automation for a hackathon prototype.</p><div className="tags"><span>ESP32</span><span>IoT</span><span>Automation</span></div></div><ExternalLink/></article></div></section>
      <section id="contact" className="section"><div className="section-title"><span>04</span><h2>Contact</h2></div><div className="contact"><a href="mailto:your.email@example.com"><Mail/><span>Email<br/><b>your.email@example.com</b></span></a><a href="https://github.com/s21gangesh-cmd"><Github/><span>GitHub<br/><b>s21gangesh-cmd</b></span></a><a href="https://linkedin.com" target="_blank"><Linkedin/><span>LinkedIn<br/><b>Profile</b></span></a></div></section>
    </main>
    <footer>© {new Date().getFullYear()} Gangesh · Built with React + Vite</footer>
    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><div className="modal-icon">{selected.label||selected.name.slice(0,2)}</div><h2>{selected.name}</h2><p>{selected.description||"Skill details are managed by the portfolio backend."}</p><div className="bar big"><i style={{width:(selected.progress||0)+"%"}}/></div>{selected.certificateUrl&&<a className="btn primary" href={selected.certificateUrl} target="_blank">View certificate</a>}{selected.certificateImage&&<img src={selected.certificateImage} alt={selected.name+" certificate"}/>}</div></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);