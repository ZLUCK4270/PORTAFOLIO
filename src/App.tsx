import React from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { CyberCursor } from './components/CyberCursor.tsx';
import { AtmosphereBackground } from './components/AtmosphereBackground.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { TrajectorySection } from './components/TrajectorySection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-red-500/25 selection:text-rose-200">
        {/* Custom Cyberpunk Reticle & Smooth Particle Trail Cursor */}
        <CyberCursor />

        {/* Responsive Epic Atmospheric Wallpaper & Scrims */}
        <AtmosphereBackground />

        {/* Top 3-zone contract Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="relative z-10 flex-1">
          {/* 1. SECCIÓN HERO */}
          <HeroSection />

          {/* 2. SECCIÓN DE TRAYECTORIA Y PERFIL */}
          <TrajectorySection />

          {/* 3. SECCIÓN DE HABILIDADES Y STACK TECNOLÓGICO */}
          <SkillsSection />

          {/* 4. SECCIÓN DE PROYECTOS Y SOLUCIONES IA */}
          <ProjectsSection />

          {/* 5. SECCIÓN DE CONTACTO */}
          <ContactSection />
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
