import React from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AtmosphereBackground } from './components/AtmosphereBackground.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { TrajectorySection } from './components/TrajectorySection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ScrollProgressBar } from './components/ScrollReveal.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#080b12] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
        {/* Sleek Reading Scroll Progress Indicator (Framer Motion) */}
        <ScrollProgressBar />

        {/* Subtle Executive Architectural Atmosphere */}
        <AtmosphereBackground />

        {/* Executive 3-Zone Top Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="relative z-10 flex-1">
          {/* 1. SECCIÓN DE PRESENTACIÓN & HERO */}
          <HeroSection />

          {/* 2. SECCIÓN DE TRAYECTORIA, INSIGNIAS & CERTIFICADOS */}
          <TrajectorySection />

          {/* 3. SECCIÓN DE HABILIDADES Y STACK TECNOLÓGICO */}
          <SkillsSection />

          {/* 4. SECCIÓN DE PROYECTOS Y CASOS DE ESTUDIO IA */}
          <ProjectsSection />

          {/* 5. SECCIÓN DE CONTACTO PROFESIONAL */}
          <ContactSection />
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
