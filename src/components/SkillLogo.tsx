import React from 'react';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiPhp,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiFastapi,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiQdrant,
  SiDocker,
  SiNginx,
  SiStreamlit,
  SiVercel,
  SiPytorch,
  SiOpencv,
  SiHuggingface,
  SiScikitlearn,
  SiScipy,
  SiGithub,
  SiBlender,
  SiCoreldraw,
  SiInkscape,
  SiCisco,
  SiRedhat
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { DiPhotoshop, DiMsqlServer } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';
import { GrOracle } from 'react-icons/gr';
import {
  Scan,
  Sparkles,
  Layers,
  Crop,
  Code2,
  Cpu,
  Database,
  Terminal,
  Shield
} from 'lucide-react';

interface SkillLogoProps {
  name: string;
  className?: string;
  size?: number;
}

interface LogoConfig {
  component: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glow?: string;
}

// Mapa de logos reales con colores de marca oficiales
const SKILL_ICONS: Record<string, LogoConfig> = {
  // Lenguajes & Frameworks
  Python: {
    component: SiPython,
    color: '#387EB8',
    glow: 'rgba(56, 126, 184, 0.4)'
  },
  TypeScript: {
    component: SiTypescript,
    color: '#3178C6',
    glow: 'rgba(49, 120, 198, 0.4)'
  },
  JavaScript: {
    component: SiJavascript,
    color: '#F7DF1E',
    glow: 'rgba(247, 223, 30, 0.4)'
  },
  Java: {
    component: FaJava,
    color: '#EA2D2E',
    glow: 'rgba(234, 45, 46, 0.4)'
  },
  'C / C++': {
    component: SiCplusplus,
    color: '#00599C',
    glow: 'rgba(0, 89, 156, 0.4)'
  },
  PHP: {
    component: SiPhp,
    color: '#777BB4',
    glow: 'rgba(119, 123, 180, 0.4)'
  },
  'HTML5 & CSS3': {
    component: SiHtml5,
    color: '#E34F26',
    glow: 'rgba(227, 79, 38, 0.4)'
  },
  React: {
    component: SiReact,
    color: '#61DAFB',
    glow: 'rgba(97, 218, 251, 0.45)'
  },
  'Next.js': {
    component: SiNextdotjs,
    color: '#EDEDED',
    glow: 'rgba(255, 255, 255, 0.35)'
  },
  'Vue.js': {
    component: SiVuedotjs,
    color: '#4FC08D',
    glow: 'rgba(79, 192, 141, 0.4)'
  },
  'Node.js': {
    component: SiNodedotjs,
    color: '#5FA04E',
    glow: 'rgba(95, 160, 78, 0.4)'
  },
  NestJS: {
    component: SiNestjs,
    color: '#E0234E',
    glow: 'rgba(224, 35, 78, 0.45)'
  },
  'Express.js': {
    component: SiExpress,
    color: '#E0E0E0',
    glow: 'rgba(255, 255, 255, 0.3)'
  },
  FastAPI: {
    component: SiFastapi,
    color: '#05998B',
    glow: 'rgba(5, 153, 139, 0.45)'
  },
  'Tailwind CSS': {
    component: SiTailwindcss,
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.4)'
  },

  // Bases de Datos & Backend
  PostgreSQL: {
    component: SiPostgresql,
    color: '#4169E1',
    glow: 'rgba(65, 105, 225, 0.45)'
  },
  MySQL: {
    component: SiMysql,
    color: '#4479A1',
    glow: 'rgba(68, 121, 161, 0.4)'
  },
  'Oracle SQL': {
    component: GrOracle,
    color: '#F80000',
    glow: 'rgba(248, 0, 0, 0.45)'
  },
  SQLite: {
    component: SiSqlite,
    color: '#003B57',
    glow: 'rgba(0, 59, 87, 0.5)'
  },
  'SQL Server': {
    component: DiMsqlServer,
    color: '#CC292B',
    glow: 'rgba(204, 41, 43, 0.45)'
  },
  MongoDB: {
    component: SiMongodb,
    color: '#47A248',
    glow: 'rgba(71, 162, 72, 0.45)'
  },
  Qdrant: {
    component: SiQdrant,
    color: '#DC2626',
    glow: 'rgba(220, 38, 38, 0.5)'
  },
  Docker: {
    component: SiDocker,
    color: '#2496ED',
    glow: 'rgba(36, 150, 237, 0.45)'
  },
  Nginx: {
    component: SiNginx,
    color: '#009639',
    glow: 'rgba(0, 150, 57, 0.4)'
  },
  Streamlit: {
    component: SiStreamlit,
    color: '#FF4B4B',
    glow: 'rgba(255, 75, 75, 0.45)'
  },
  Vercel: {
    component: SiVercel,
    color: '#FAFAFA',
    glow: 'rgba(255, 255, 255, 0.35)'
  },

  // IA, Visión Artificial y Machine Learning
  'PyTorch & torchvision': {
    component: SiPytorch,
    color: '#EE4C2C',
    glow: 'rgba(238, 76, 44, 0.45)'
  },
  OpenCV: {
    component: SiOpencv,
    color: '#5C3EE8',
    glow: 'rgba(92, 62, 232, 0.45)'
  },
  'Hugging Face Transformers': {
    component: SiHuggingface,
    color: '#FFD21E',
    glow: 'rgba(255, 210, 30, 0.4)'
  },
  'Ultralytics (YOLO)': {
    component: Scan,
    color: '#00D1B2',
    glow: 'rgba(0, 209, 178, 0.45)'
  },
  'Fashion-CLIP': {
    component: Sparkles,
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.45)'
  },
  'sentence-transformers': {
    component: Layers,
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)'
  },
  'rembg & InSPyReNet': {
    component: Crop,
    color: '#EC4899',
    glow: 'rgba(236, 72, 153, 0.45)'
  },
  'scikit-learn': {
    component: SiScikitlearn,
    color: '#F7931E',
    glow: 'rgba(247, 147, 30, 0.45)'
  },
  'Pillow (PIL)': {
    component: SiPython,
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)'
  },
  SciPy: {
    component: SiScipy,
    color: '#8CAAE6',
    glow: 'rgba(140, 170, 230, 0.4)'
  },

  // Herramientas & Diseño
  'Git & GitHub': {
    component: SiGithub,
    color: '#F05032',
    glow: 'rgba(240, 80, 50, 0.45)'
  },
  'VSCodium & VS Code': {
    component: VscVscode,
    color: '#007ACC',
    glow: 'rgba(0, 122, 204, 0.45)'
  },
  'Blender 3D (+ Python Scripts)': {
    component: SiBlender,
    color: '#E87D0D',
    glow: 'rgba(232, 125, 13, 0.45)'
  },
  'CorelDRAW (+ Macros VBA)': {
    component: SiCoreldraw,
    color: '#729D34',
    glow: 'rgba(114, 157, 52, 0.45)'
  },
  Photoshop: {
    component: DiPhotoshop,
    color: '#31A8FF',
    glow: 'rgba(49, 168, 255, 0.45)'
  },
  Inkscape: {
    component: SiInkscape,
    color: '#F3F4F6',
    glow: 'rgba(243, 244, 246, 0.35)'
  },

  // Certificaciones & Redes
  'Cisco Networking Academy': {
    component: SiCisco,
    color: '#1BA0D7',
    glow: 'rgba(27, 160, 215, 0.45)'
  },
  'Red Hat Academy': {
    component: SiRedhat,
    color: '#EE0000',
    glow: 'rgba(238, 0, 0, 0.5)'
  }
};

export const SkillLogo: React.FC<SkillLogoProps> = ({
  name,
  className = 'w-5 h-5',
  size
}) => {
  const config = SKILL_ICONS[name];

  if (!config) {
    return <Code2 className={`${className} text-red-400`} />;
  }

  const IconComponent = config.component;

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
      title={name}
    >
      <IconComponent
        className={`${className} transition-all duration-300 drop-shadow-sm`}
        style={{
          color: config.color,
          filter: `drop-shadow(0 0 6px ${config.glow || 'rgba(239,68,68,0.3)'})`
        }}
      />
    </div>
  );
};

