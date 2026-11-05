export interface SkillItem {
  name: string;
  category: 'languages' | 'databases' | 'ai_ml' | 'tools' | 'certifications';
  level: string; // e.g. 'Avanzado', 'Intermedio', 'Especializado'
  description: string;
  highlight?: string;
  iconType: string;
}

export interface SkillCategory {
  id: 'all' | 'languages' | 'databases' | 'ai_ml' | 'tools' | 'certifications';
  label: string;
  count: number;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'all', label: 'Todo el Stack', count: 43 },
  { id: 'languages', label: 'Lenguajes & Frameworks', count: 16 },
  { id: 'databases', label: 'Bases de Datos & Backend', count: 11 },
  { id: 'ai_ml', label: 'IA & Visión Artificial', count: 12 },
  { id: 'tools', label: 'Herramientas & Diseño', count: 7 },
  { id: 'certifications', label: 'Certificaciones & Redes', count: 2 },
];

export const SKILLS_DATA: SkillItem[] = [
  // Lenguajes y Frameworks
  {
    name: 'Python',
    category: 'languages',
    level: 'Avanzado',
    description: 'Lenguaje principal para scripts de automatización, arquitecturas de IA, pipelines de visión artificial y prototipado.',
    highlight: 'Scikit-learn, PyTorch, FastAPI, OpenCV',
    iconType: 'code'
  },
  {
    name: 'TypeScript',
    category: 'languages',
    level: 'Avanzado',
    description: 'Desarrollo frontend y full-stack tipado, arquitecturas robustas y escalabilidad empresarial.',
    highlight: 'Strict typing, React, Next.js, Node.js',
    iconType: 'code'
  },
  {
    name: 'JavaScript',
    category: 'languages',
    level: 'Avanzado',
    description: 'Manipulación del DOM, programación reactiva y asíncrona (ES6+), Web APIs y arquitecturas SPA.',
    highlight: 'ESNext, async/await, Canvas API',
    iconType: 'code'
  },
  {
    name: 'Java',
    category: 'languages',
    level: 'Intermedio',
    description: 'Programación orientada a objetos (POO), patrones de diseño, estructuras de datos y backend.',
    highlight: 'POO, concurrencia, backend modular',
    iconType: 'code'
  },
  {
    name: 'C / C++',
    category: 'languages',
    level: 'Intermedio',
    description: 'Gestión de memoria, algoritmos de alto rendimiento y programación para microcontroladores.',
    highlight: 'Punteros, optimización en microcontroladores',
    iconType: 'code'
  },
  {
    name: 'PHP',
    category: 'languages',
    level: 'Intermedio',
    description: 'Desarrollo web backend, integración con bases de datos relacionales y APIs REST.',
    highlight: 'MVC, integración MySQL',
    iconType: 'code'
  },
  {
    name: 'HTML5 & CSS3',
    category: 'languages',
    level: 'Avanzado',
    description: 'Estructuración semántica, maquetación responsive, animaciones fluidas y accesibilidad web.',
    highlight: 'Flexbox, Grid, CSS Variables, A11y',
    iconType: 'layout'
  },
  {
    name: 'React',
    category: 'languages',
    level: 'Avanzado',
    description: 'Creación de interfaces de usuario modulares basadas en componentes, hooks personalizados y optimización de render.',
    highlight: 'Custom Hooks, SPA, Context API',
    iconType: 'react'
  },
  {
    name: 'Next.js',
    category: 'languages',
    level: 'Intermedio',
    description: 'Framework React con renderizado híbrido (SSR/SSG), optimización SEO y API routes eficientes.',
    highlight: 'App Router, Server Components',
    iconType: 'globe'
  },
  {
    name: 'Vue.js',
    category: 'languages',
    level: 'Intermedio',
    description: 'Desarrollo de interfaces reactivas con Composition API, directivas y ecosistema ligero.',
    highlight: 'Composition API, Vue Router',
    iconType: 'layout'
  },
  {
    name: 'Node.js',
    category: 'languages',
    level: 'Avanzado',
    description: 'Entorno de ejecución de backend asíncrono conducido por eventos, servicios REST y microservicios.',
    highlight: 'Event Loop, Streams, NPM ecosystem',
    iconType: 'server'
  },
  {
    name: 'NestJS',
    category: 'languages',
    level: 'Intermedio',
    description: 'Framework backend progresivo para Node.js basado en TypeScript con arquitectura modular e inyección de dependencias.',
    highlight: 'Inyección de dependencias, decorators',
    iconType: 'server'
  },
  {
    name: 'Express.js',
    category: 'languages',
    level: 'Avanzado',
    description: 'Servidores web minimalistas y middlewares para routing de APIs y arquitecturas cliente-servidor.',
    highlight: 'Middlewares, REST APIs, JSON routing',
    iconType: 'server'
  },
  {
    name: 'FastAPI',
    category: 'languages',
    level: 'Avanzado',
    description: 'Framework Python de alto rendimiento para APIs de inferencia de modelos de IA con tipado Pydantic y OpenAPI.',
    highlight: 'Inferencia de IA en tiempo real, Swagger UI',
    iconType: 'zap'
  },
  {
    name: 'Tailwind CSS',
    category: 'languages',
    level: 'Avanzado',
    description: 'Diseño utility-first para interfaces modernas, temas oscuros y sistemas de diseño consistentes.',
    highlight: 'Modo oscuro, responsive design, v4 engine',
    iconType: 'palette'
  },

  // Bases de Datos y Backend
  {
    name: 'PostgreSQL',
    category: 'databases',
    level: 'Avanzado',
    description: 'Base de datos relacional avanzada con soporte para transacciones complejas, índices y extensiones relacionales.',
    highlight: 'ACID, consultas complejas, triggers',
    iconType: 'database'
  },
  {
    name: 'MySQL',
    category: 'databases',
    level: 'Avanzado',
    description: 'Gestión y diseño de esquemas relacionales, normalización y optimización de consultas SQL.',
    highlight: 'Normalización, índices, procedimientos',
    iconType: 'database'
  },
  {
    name: 'Oracle SQL',
    category: 'databases',
    level: 'Intermedio',
    description: 'Consultas avanzadas para gestión empresarial, funciones analíticas y modelado relacional corporativo.',
    highlight: 'PL/SQL, vistas materializadas',
    iconType: 'database'
  },
  {
    name: 'SQLite',
    category: 'databases',
    level: 'Avanzado',
    description: 'Base de datos embebida ligera para aplicaciones locales, prototipos rápidos y edge computing.',
    highlight: 'In-memory, edge computing, portabilidad',
    iconType: 'database'
  },
  {
    name: 'SQL Server',
    category: 'databases',
    level: 'Intermedio',
    description: 'Gestor de bases de datos de Microsoft para entornos corporativos, procedimientos y backups.',
    highlight: 'T-SQL, diagramado relacional',
    iconType: 'database'
  },
  {
    name: 'MongoDB',
    category: 'databases',
    level: 'Intermedio',
    description: 'Base de datos NoSQL documental para esquemas flexibles, colecciones y agregaciones JSON.',
    highlight: 'Agregaciones, documentos BSON',
    iconType: 'database'
  },
  {
    name: 'Qdrant',
    category: 'databases',
    level: 'Especializado',
    description: 'Base de datos vectorial para búsqueda semántica, filtrado de embeddings y sistemas RAG.',
    highlight: 'Búsqueda por similitud vectorial, RAG',
    iconType: 'cpu'
  },
  {
    name: 'Docker',
    category: 'databases',
    level: 'Intermedio',
    description: 'Contenedorización de aplicaciones, aislamiento de entornos y despliegues reproducibles.',
    highlight: 'Dockerfiles, Docker Compose, aislamiento',
    iconType: 'box'
  },
  {
    name: 'Nginx',
    category: 'databases',
    level: 'Intermedio',
    description: 'Proxy inverso, balanceo de carga y servidor HTTP eficiente para despliegues web.',
    highlight: 'Reverse proxy, SSL, headers',
    iconType: 'server'
  },
  {
    name: 'Streamlit',
    category: 'databases',
    level: 'Avanzado',
    description: 'Desarrollo veloz de tableros interactivos para visualización de datos y demos de modelos de ML.',
    highlight: 'Data dashboards, prototipado de IA',
    iconType: 'layout'
  },
  {
    name: 'Vercel',
    category: 'databases',
    level: 'Avanzado',
    description: 'Despliegue continuo (CI/CD) de aplicaciones serverless y frontends modernos optimizados.',
    highlight: 'Edge deployment, CI/CD automatizado',
    iconType: 'globe'
  },

  // IA, Visión Artificial y Machine Learning
  {
    name: 'PyTorch & torchvision',
    category: 'ai_ml',
    level: 'Especializado',
    description: 'Entrenamiento e inferencia de redes neuronales profundas para visión por computadora y tensores.',
    highlight: 'Tensors, CNNs, CUDA inference',
    iconType: 'cpu'
  },
  {
    name: 'OpenCV',
    category: 'ai_ml',
    level: 'Avanzado',
    description: 'Procesamiento digital de imágenes, detección de características, filtrado y captura de vídeo en tiempo real.',
    highlight: 'Filtros, segmentación, tracking',
    iconType: 'eye'
  },
  {
    name: 'Hugging Face Transformers',
    category: 'ai_ml',
    level: 'Especializado',
    description: 'Implementación de modelos pre-entrenados para PLN, visión y modelos multimodales.',
    highlight: 'Pipelines, fine-tuning, embeddings',
    iconType: 'cpu'
  },
  {
    name: 'Ultralytics (YOLO)',
    category: 'ai_ml',
    level: 'Avanzado',
    description: 'Detección de objetos en tiempo real, segmentación de instancias y clasificación con alta precisión.',
    highlight: 'YOLOv8 / YOLO11, bounding boxes',
    iconType: 'eye'
  },
  {
    name: 'Fashion-CLIP',
    category: 'ai_ml',
    level: 'Especializado',
    description: 'Modelo multimodal para búsqueda visual y comprensión cruzada entre texto e imágenes en moda.',
    highlight: 'Zero-shot classification, embeddings visuales',
    iconType: 'sparkles'
  },
  {
    name: 'sentence-transformers',
    category: 'ai_ml',
    level: 'Avanzado',
    description: 'Generación de representaciones vectoriales densas para búsqueda semántica y clustering.',
    highlight: 'Dense embeddings, similitud de coseno',
    iconType: 'cpu'
  },
  {
    name: 'rembg & InSPyReNet',
    category: 'ai_ml',
    level: 'Avanzado',
    description: 'Eliminación automática de fondos y segmentación de objetos salientes mediante redes neuronales profundas.',
    highlight: 'Salient object detection, alpha matting',
    iconType: 'image'
  },
  {
    name: 'scikit-learn',
    category: 'ai_ml',
    level: 'Avanzado',
    description: 'Algoritmos clásicos de machine learning: regresión, clasificación, clustering y validación cruzada.',
    highlight: 'Random Forest, SVM, métricas de precisión',
    iconType: 'cpu'
  },
  {
    name: 'Pillow (PIL)',
    category: 'ai_ml',
    level: 'Avanzado',
    description: 'Manipulación y preprocesamiento de imágenes rasterizadas en pipelines de datos.',
    highlight: 'Transformaciones de color, resize, buffers',
    iconType: 'image'
  },
  {
    name: 'SciPy',
    category: 'ai_ml',
    level: 'Intermedio',
    description: 'Cálculo científico, optimización matemática, procesamiento de señales y álgebra lineal.',
    highlight: 'Matrices dispersas, convolución',
    iconType: 'cpu'
  },

  // Herramientas, Diseño y Entornos
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 'Avanzado',
    description: 'Control de versiones distribuido, flujos de trabajo colaborativos, branching y GitHub Actions.',
    highlight: 'Git flow, pull requests, resolución de conflictos',
    iconType: 'git-branch'
  },
  {
    name: 'VSCodium & VS Code',
    category: 'tools',
    level: 'Avanzado',
    description: 'Entorno de desarrollo principal configurado con extensiones de depuración, linting y soporte de IA.',
    highlight: 'Atajos de teclado, terminal integrada, debuggers',
    iconType: 'terminal'
  },
  {
    name: 'Blender 3D (+ Python Scripts)',
    category: 'tools',
    level: 'Especializado',
    description: 'Modelado 3D procedural, generación de mallas y automatización mediante scripts de la API bpy en Python.',
    highlight: 'Python scripting (bpy), shaders, renders',
    iconType: 'box'
  },
  {
    name: 'CorelDRAW (+ Macros VBA)',
    category: 'tools',
    level: 'Avanzado',
    description: 'Diseño vectorial para producción gráfica, automatización de tareas repetitivas mediante macros en Visual Basic.',
    highlight: 'Macros VBA, diseño técnico vectorial',
    iconType: 'palette'
  },
  {
    name: 'Photoshop',
    category: 'tools',
    level: 'Avanzado',
    description: 'Retoque fotográfico avanzado, composición de mapas de textura y postproducción de activos visuales.',
    highlight: 'Capas de ajuste, máscaras, texturizado',
    iconType: 'image'
  },
  {
    name: 'Inkscape',
    category: 'tools',
    level: 'Intermedio',
    description: 'Ilustración vectorial de código abierto y optimización de gráficos SVG para la web.',
    highlight: 'Gráficos vectoriales SVG limpios',
    iconType: 'layout'
  },

  // Certificaciones y Redes
  {
    name: 'Cisco Networking Academy',
    category: 'certifications',
    level: 'Certificado',
    description: 'Fundamentos sólidos de redes IP, conmutación, enrutamiento, ciberseguridad, automatización y ciencia de datos.',
    highlight: 'Redes, Ciberseguridad, Automatización, Ciencia de Datos',
    iconType: 'shield'
  },
  {
    name: 'Red Hat Academy',
    category: 'certifications',
    level: 'Certificado',
    description: 'Administración de sistemas Linux empresariales, automatización con scripts y gestión de entornos de servidor.',
    highlight: 'Linux Enterprise, comandos bash, permisos',
    iconType: 'terminal'
  }
];

export const TRAJECTORY_MILESTONES = [
  {
    period: '2024 - Presente',
    title: 'Ingeniería de Software con Inteligencia Artificial',
    institution: 'SENATI - Quinto Ciclo',
    type: 'Educación Superior Técnica',
    description: 'Formación de alto nivel centrada en arquitectura de software moderno, desarrollo full-stack, redes neuronales, visión por computadora y gestión de proyectos tecnológicos.',
    skills: ['Algoritmos', 'Redes Neuronales', 'Arquitectura de Software', 'Computer Vision']
  },
  {
    period: 'Evolución Técnica',
    title: 'Filosofía hacia la Programación Autónoma',
    institution: 'Autodidacta & Proyectos de Aplicación',
    type: 'Crecimiento Profesional',
    description: 'Enfoque estructurado: aprovechar herramientas y modelos de IA como aceleradores de productividad mientras se consolida un dominio riguroso desde los fundamentos (From Scratch Mastery), comprendiendo cada capa de abstracción.',
    skills: ['Comprensión Profunda', 'Optimización', 'Depuración de Código', 'Pensamiento Crítico']
  },
  {
    period: 'Experiencia Práctica',
    title: 'Resolución de Problemas y Gestión Tecnológica',
    institution: 'Entornos Prácticos & Atención Especializada',
    type: 'Competencias Profesionales',
    description: 'Capacidad comprobada en diagnóstico rápido de fallas de software y sistemas, atención al cliente con alta empatía, mantenimiento preventivo de entornos de desarrollo y coordinación eficiente de proyectos.',
    skills: ['Soporte Técnico', 'Atención al Cliente', 'Diagnóstico Ágil', 'Gestión de Equipos']
  }
];

export interface AIProjectItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  architecture: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  highlight: string;
  icon: 'eye' | 'database' | 'cpu' | 'layers';
}

export const AI_PROJECTS_DATA: AIProjectItem[] = [
  {
    id: 'computer-vision-yolo',
    title: 'Sistema de Visión Artificial y Detección de Objetos en Tiempo Real',
    category: 'Computer Vision & Deep Learning',
    subtitle: 'Pipeline de Inferencia Ultralytics YOLO & OpenCV',
    description: 'Diseño e implementación de un pipeline optimizado de detección de objetos, clasificación y segmentación espacial en transmisiones de video en vivo. Procesamiento asíncrono y exportación de telemetría de conteo y zonas de interés.',
    architecture: 'Inferencia neuronal con PyTorch / YOLOv8 / YOLO11, preprocesamiento con OpenCV, servidor de streaming en FastAPI y WebSockets de baja latencia.',
    techStack: ['PyTorch', 'YOLOv8/11', 'OpenCV', 'FastAPI', 'Python', 'WebSockets'],
    metrics: [
      { label: 'Rendimiento', value: '45+ FPS (GPU)' },
      { label: 'Precisión mAP', value: '91.8%' },
      { label: 'Latencia Inferencia', value: '< 22ms' }
    ],
    highlight: 'Detección en tiempo real con bounding boxes y segmentación poligonal',
    icon: 'eye'
  },
  {
    id: 'semantic-search-rag',
    title: 'Motor de Búsqueda Semántica Vectorial & RAG Multimodal',
    category: 'Sistemas RAG & Embeddings',
    subtitle: 'Qdrant Vector Database + Fashion-CLIP / Sentence-Transformers',
    description: 'Arquitectura de recuperación aumentada para búsqueda semántica multimodal. Transforma descripciones en lenguaje natural y consultas visuales en representaciones vectoriales densas con indexación HNSW para recuperación instantánea.',
    architecture: 'Modelos de embeddings densos con Sentence-Transformers y Fashion-CLIP, indexación vectorial distribuida en Qdrant (Docker), API REST en Node.js/TypeScript.',
    techStack: ['Qdrant', 'Fashion-CLIP', 'sentence-transformers', 'Docker', 'TypeScript', 'Node.js'],
    metrics: [
      { label: 'Búsqueda Vectorial', value: '< 15ms' },
      { label: 'Espacio Vectorial', value: '768 dims' },
      { label: 'Similitud', value: 'Coseno HNSW' }
    ],
    highlight: 'Búsqueda cruzada texto-a-imagen y recuperación de información contextual',
    icon: 'database'
  },
  {
    id: 'nlp-sentiment-transformers',
    title: 'Pipeline de Procesamiento de Lenguaje Natural & Embeddings',
    category: 'NLP & Transformers',
    subtitle: 'Hugging Face Transformers + Inferencia Vectorial en FastAPI',
    description: 'Pipeline de análisis semántico, extracción de entidades y clasificación de texto mediante modelos preentrenados y fine-tuning. Diseñado para procesamiento asíncrono con colas de mensajes y APIs de alta concurrencia.',
    architecture: 'Modelos de la familia RoBERTa/MiniLM con Hugging Face Transformers, inferencia optimizada con PyTorch (TorchScript), API REST en FastAPI y cache en memoria.',
    techStack: ['PyTorch', 'Transformers', 'FastAPI', 'Docker', 'Python', 'Scikit-learn'],
    metrics: [
      { label: 'Latencia Inferencia', value: '< 18ms' },
      { label: 'Precisión F1', value: '93.4%' },
      { label: 'Throughput', value: '420 req/s' }
    ],
    highlight: 'Clasificación de texto multietiqueta y extracción semántica de entidades',
    icon: 'cpu'
  },
  {
    id: 'salient-segmentation-matting',
    title: 'Pipeline Automatizado de Segmentación & Alpha Matting (Deep Vision)',
    category: 'Procesamiento de Imágenes con IA',
    subtitle: 'InSPyReNet + rembg + Pipelines Batch con Pillow & SciPy',
    description: 'Microservicio enfocado en extracción automática de siluetas de alta resolución y segmentación saliente. Optimización matricial y eliminación de ruido en bordes complejos (cabello, transparencias y bordes difusos).',
    architecture: 'Modelos InSPyReNet y U-2-Net integrados vía rembg y PyTorch, procesamiento por lotes con SciPy y Pillow, contenedorizado en Docker.',
    techStack: ['InSPyReNet', 'rembg', 'Pillow', 'SciPy', 'Docker', 'Streamlit'],
    metrics: [
      { label: 'Aceleración Batch', value: '8x más rápido' },
      { label: 'Resolución Máx', value: '4K nativo' },
      { label: 'Precisión Bordes', value: 'Alpha Matting 98%' }
    ],
    highlight: 'Aislamiento de fondo con preservación de microdetalles y transparencias',
    icon: 'layers'
  }
];

export interface CredentialItem {
  id: string;
  title: string;
  issuer: 'Cisco' | 'Red Hat';
  type: 'badge' | 'certificate';
  status: 'Verified' | 'Certificado' | 'Pending' | 'Participant';
  issuedDate: string;
  category: string;
  description: string;
  badgeTheme: 'cisco-cyan' | 'cisco-green' | 'cisco-olive' | 'cisco-blue' | 'cisco-round' | 'redhat' | 'cisco-diploma';
  topics: string[];
}

export const CREDENTIALS_DATA: CredentialItem[] = [
  // 1. Red Hat System Administration
  {
    id: 'rh124-rha',
    title: 'Red Hat System Administration I (RH124 - RHA) - Ver. 9.3',
    issuer: 'Red Hat',
    type: 'badge',
    status: 'Pending',
    issuedDate: '17 de mayo de 2025',
    category: 'Administración de Sistemas Linux Enterprise',
    description: 'Entrenamiento oficial de Red Hat Academy sobre administración de sistemas Red Hat Enterprise Linux 9.3: gestión de archivos, usuarios, servicios systemd, permisos y almacenamiento.',
    badgeTheme: 'redhat',
    topics: ['Linux RHEL 9.3', 'Bash & Terminal', 'Systemd Services', 'Permisos POSIX']
  },
  // 2. Cisco Learn-A-Thon 2026
  {
    id: 'cisco-learnathon-2026',
    title: 'Cisco Networking Academy Learn-A-Thon 2026',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Participant',
    issuedDate: '10 de julio de 2026',
    category: 'Capacitación Continua & Retos Técnicos',
    description: 'Insignia de participante en el maratón global de aprendizaje de redes y tecnologías emergentes de Cisco Networking Academy.',
    badgeTheme: 'cisco-round',
    topics: ['Cisco NetAcad', 'Retos de Redes', 'Participante Oficial']
  },
  // 3. Computer Hardware Basics
  {
    id: 'computer-hardware-basics',
    title: 'Computer Hardware Basics',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Verified',
    issuedDate: '03 de octubre de 2024',
    category: 'Hardware & Arquitectura de Computadoras',
    description: 'Fundamentos de componentes físicos de computadoras, buses, microprocesadores, memorias, almacenamiento, ensamblaje y diagnóstico metódico de fallas.',
    badgeTheme: 'cisco-cyan',
    topics: ['Arquitectura de Hardware', 'Diagnóstico de Fallas', 'CPUs & Placas Base', 'Almacenamiento']
  },
  // 4. Introduction to Cybersecurity
  {
    id: 'intro-cybersecurity-badge',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Verified',
    issuedDate: '21 de agosto de 2024',
    category: 'Seguridad de la Información & Redes',
    description: 'Comprensión de amenazas cibernéticas, ingeniería social, malware, criptografía básica, defensas perimetrales y principios de confidencialidad, integridad y disponibilidad (CIA Triad).',
    badgeTheme: 'cisco-green',
    topics: ['Amenazas & Malware', 'Criptografía', 'Defensas Perimetrales', 'CIA Triad']
  },
  // 5. Introduction to Data Science
  {
    id: 'intro-data-science-badge',
    title: 'Introduction to Data Science',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Verified',
    issuedDate: '10 de octubre de 2024',
    category: 'Ciencia de Datos & Análisis Exploratorio',
    description: 'Fundamentos de recopilación de datos, limpieza estructurada, análisis exploratorio, correlaciones estadísticas y visualización gráfica con aplicaciones prácticas.',
    badgeTheme: 'cisco-green',
    topics: ['Ciencia de Datos', 'Limpieza de Datos', 'Estadística Descriptiva', 'Visualización']
  },
  // 6. Introduction to IoT
  {
    id: 'intro-iot-badge',
    title: 'Introduction to IoT',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Verified',
    issuedDate: '08 de agosto de 2024',
    category: 'Internet de las Cosas & Automatización',
    description: 'Conexión de dispositivos embebidos, sensores y actuadores a internet, protocolos de comunicación IoT y análisis de datos en el borde (Edge Computing).',
    badgeTheme: 'cisco-olive',
    topics: ['Sensores & Actuadores', 'Protocolos IoT', 'Edge Computing', 'Automatización']
  },
  // 7. Networking Academy Learn-A-Thon 2025
  {
    id: 'cisco-learnathon-2025',
    title: 'Networking Academy Learn-A-Thon 2025',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Participant',
    issuedDate: '08 de julio de 2026',
    category: 'Capacitación Continua & Retos Técnicos',
    description: 'Insignia de participante en las jornadas globales Learn-A-Thon promovidas por Cisco Networking Academy.',
    badgeTheme: 'cisco-round',
    topics: ['Cisco Learn-A-Thon', 'Networking', 'Capacitación']
  },
  // 8. Networking Basics
  {
    id: 'networking-basics-badge',
    title: 'Networking Basics',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Verified',
    issuedDate: '12 de septiembre de 2024',
    category: 'Redes & Protocolos de Comunicación',
    description: 'Arquitectura del modelo OSI y suite TCP/IP, direccionamiento IPv4/IPv6, subredes, switches, routers y protocolos de transporte (TCP/UDP).',
    badgeTheme: 'cisco-blue',
    topics: ['Modelo OSI & TCP/IP', 'Subredes IPv4/IPv6', 'Routing & Switching', 'Protocolos LAN/WAN']
  },
  // 9. Python Essentials 1 (Badge)
  {
    id: 'python-essentials-1-badge',
    title: 'Python Essentials 1',
    issuer: 'Cisco',
    type: 'badge',
    status: 'Verified',
    issuedDate: '17 de octubre de 2024',
    category: 'Programación & Fundamentos Algorítmicos',
    description: 'Sintaxis central de Python, tipos de datos primitivos y compuestos, estructuras de control condicionales y bucles, funciones, módulos y depuración lógica.',
    badgeTheme: 'cisco-cyan',
    topics: ['Sintaxis Python', 'Estructuras de Control', 'Funciones & Módulos', 'Algoritmia']
  },
  // 10. Python Essentials 1 (Certificado)
  {
    id: 'python-essentials-1-cert',
    title: 'Python Essentials 1',
    issuer: 'Cisco',
    type: 'certificate',
    status: 'Certificado',
    issuedDate: '17 oct 2024',
    category: 'Curso Oficial Cisco',
    description: 'Certificado oficial de finalización de curso otorgado por Cisco Networking Academy tras aprobar evaluaciones teóricas y prácticas de programación estructurada en Python.',
    badgeTheme: 'cisco-diploma',
    topics: ['Python 3', 'Lógica de Programación', 'Colecciones & Listas', 'Evaluación Aprobada']
  },
  // 11. Introducción a la Ciencia de Datos (Certificado)
  {
    id: 'data-science-cert',
    title: 'Introducción a la Ciencia de Datos',
    issuer: 'Cisco',
    type: 'certificate',
    status: 'Certificado',
    issuedDate: '10 oct 2024',
    category: 'Curso Oficial Cisco',
    description: 'Certificado oficial que acredita el dominio de metodologías para el descubrimiento de patrones, toma de decisiones basada en datos y fundamentos de IA/ML.',
    badgeTheme: 'cisco-diploma',
    topics: ['Data Science', 'Metodologías de Análisis', 'Patrones en Datos', 'Toma de Decisiones']
  },
  // 12. Conceptos Básicos de Hardware de Computadoras (Certificado)
  {
    id: 'hardware-basics-cert',
    title: 'Conceptos Básicos de Hardware de Computadoras',
    issuer: 'Cisco',
    type: 'certificate',
    status: 'Certificado',
    issuedDate: '03 oct 2024',
    category: 'Curso Oficial Cisco',
    description: 'Certificado oficial de acreditación técnica en arquitectura de hardware de computadoras personales, periféricos y resolución de incidencias físicas.',
    badgeTheme: 'cisco-diploma',
    topics: ['Hardware PC', 'Arquitectura de Computadoras', 'Mantenimiento & Ensamble', 'Periféricos']
  },
  // 13. Conceptos básicos de redes (Certificado)
  {
    id: 'networking-basics-cert',
    title: 'Conceptos básicos de redes',
    issuer: 'Cisco',
    type: 'certificate',
    status: 'Certificado',
    issuedDate: '12 sept 2024',
    category: 'Curso Oficial Cisco',
    description: 'Certificado oficial en principios de networking, configuración básica de dispositivos de red y topologías de comunicación según estándares de la industria.',
    badgeTheme: 'cisco-diploma',
    topics: ['Redes de Datos', 'Topologías LAN', 'Configuración de Dispositivos', 'Protocolos de Internet']
  },
  // 14. Introducción a la Ciberseguridad (Certificado)
  {
    id: 'cybersecurity-cert',
    title: 'Introducción a la Ciberseguridad',
    issuer: 'Cisco',
    type: 'certificate',
    status: 'Certificado',
    issuedDate: '21 ago 2024',
    category: 'Curso Oficial Cisco',
    description: 'Certificado oficial que valida el conocimiento sobre protección de activos digitales, detección de vulnerabilidades y buenas prácticas de seguridad informática.',
    badgeTheme: 'cisco-diploma',
    topics: ['Seguridad Ofensiva/Defensiva', 'Mitigación de Riesgos', 'Protección de Redes', 'Estándares Cisco']
  },
  // 15. Introducción al Internet de las Cosas (Certificado)
  {
    id: 'iot-cert',
    title: 'Introducción al Internet de las Cosas',
    issuer: 'Cisco',
    type: 'certificate',
    status: 'Certificado',
    issuedDate: '08 ago 2024',
    category: 'Curso Oficial Cisco',
    description: 'Certificado oficial en transformación digital, sensores, automatización y ecosistemas de dispositivos conectados.',
    badgeTheme: 'cisco-diploma',
    topics: ['Internet of Things', 'Automatización', 'Sensores Inteligentes', 'Transformación Digital']
  }
];
