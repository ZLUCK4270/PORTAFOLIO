# 🚀 Guía de Despliegue 100% Gratuito (Sin Tarjeta de Crédito)
### Portafolio Profesional de Zenón Luciano Acuña Chuquihuanca
*Estudiante de Ingeniería de Software con Inteligencia Artificial - SENATI*

Esta guía te explica paso a paso cómo publicar tu portafolio en internet de forma **totalmente gratuita**, con certificado de seguridad **SSL (HTTPS)** automático y conectada a tu cuenta de GitHub ([github.com/ZLUCK4270](https://github.com/ZLUCK4270)).

---

## 📋 Resumen de Opciones Gratuitas

| Plataforma | Costo | Tarjeta Requerida | Dominio Gratis Incluido | Facilidad | Recomendación |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Vercel** | $0.00 | ❌ No | `tu-nombre.vercel.app` | ⭐⭐⭐⭐⭐ (Automático) | **Opción 1 (Recomendada)** |
| **Netlify** | $0.00 | ❌ No | `tu-nombre.netlify.app` | ⭐⭐⭐⭐⭐ (Arrastrar y Soltar / Git) | **Opción 2** |
| **GitHub Pages** | $0.00 | ❌ No | `ZLUCK4270.github.io` | ⭐⭐⭐⭐ (Nativo en GitHub) | **Opción 3** |
| **Cloudflare Pages** | $0.00 | ❌ No | `tu-nombre.pages.dev` | ⭐⭐⭐⭐⭐ (Ultra Rápido) | **Opción 4** |

---

## 🥇 Opción 1: Despliegue en Vercel (Recomendada - 2 Minutos)

Vercel es la plataforma líder para aplicaciones React y Vite. Detecta automáticamente la configuración del proyecto y actualiza la web cada vez que haces `git push` a tu repositorio.

### Paso 1: Subir tu código a GitHub
1. Entra a tu perfil de GitHub: [https://github.com/ZLUCK4270](https://github.com/ZLUCK4270)
2. Crea un nuevo repositorio público (ejemplo: `portafolio-ia` o `zenon-portfolio`).
3. En tu máquina local, inicializa Git y sube el proyecto:
```bash
git init
git add .
git commit -m "feat: portafolio profesional Zenón Luciano"
git branch -M main
git remote add origin https://github.com/ZLUCK4270/portafolio-ia.git
git push -u origin main
```

### Paso 2: Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com) y haz clic en **Sign Up**.
2. Selecciona **Continue with GitHub** (iniciarás sesión con tu cuenta de GitHub `ZLUCK4270` sin ingresar tarjetas).
3. En tu panel de Vercel, haz clic en **"Add New..."** -> **"Project"**.
4. Verás la lista de tus repositorios; busca `portafolio-ia` y haz clic en **Import**.
5. Vercel detectará automáticamente que es un proyecto **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Haz clic en el botón azul **"Deploy"**.
7. En menos de 60 segundos tu portafolio estará online con un enlace como:
   `https://portafolio-ia-zluck.vercel.app`

*(Cualquier cambio que subas a GitHub en el futuro se publicará automáticamente en vivo).*

---

## 🥈 Opción 2: Despliegue en Netlify (Con Git o Arrastrando Carpeta)

Netlify no requiere tarjeta de crédito y te permite desplegar incluso sin tocar la terminal.

### Método A: Arrastrar la carpeta compilada (Sin configurar nada)
1. En tu computadora, compila el proyecto:
```bash
npm run build
```
*(Esto creará la carpeta `dist` con todos los archivos estáticos optimizados).*
2. Ve a [app.netlify.com/drop](https://app.netlify.com/drop).
3. Inicia sesión con GitHub o correo gratis.
4. Arrastra la carpeta `dist` al recuadro en pantalla.
5. ¡Listo! En 5 segundos tendrás tu web funcionando.

### Método B: Conectado a GitHub (Recomendado para CI/CD)
1. Regístrate gratis en [netlify.com](https://netlify.com) con tu GitHub.
2. Haz clic en **"Add new site"** -> **"Import an existing project"**.
3. Selecciona **GitHub** y escoge tu repositorio `portafolio-ia`.
4. Deja la configuración por defecto:
   - Base directory: *(vacío)*
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Haz clic en **"Deploy site"**.

---

## 🥉 Opción 3: Despliegue en GitHub Pages

GitHub Pages te permite tener tu web en el dominio oficial `https://ZLUCK4270.github.io`.

### Paso a paso:
1. Si quieres que sea tu sitio principal de GitHub, crea un repositorio con el nombre exacto:
   `ZLUCK4270.github.io`
2. En tu archivo `vite.config.ts`, si lo subes a un sub-repositorio (ej. `portafolio`), ajusta la propiedad `base`:
   ```ts
   // vite.config.ts
   export default defineConfig({
     base: '/portafolio/', // o '/' si es ZLUCK4270.github.io
     // ... resto de tu config
   });
   ```
3. En tu repositorio de GitHub, ve a **Settings** -> **Pages**.
4. En **Build and deployment** -> **Source**, selecciona **GitHub Actions**.
5. Elige la plantilla sugerida **"Static HTML / Vite"** o crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🛡️ Configuración de Redirecciones SPA (Importante para React Router / SPA)

Para evitar errores 404 al recargar páginas en Netlify o Vercel, este proyecto ya cuenta con el routing SPA preparado. Si usas Vercel, puedes incluir este archivo opcional `vercel.json` en la raíz si en el futuro agregas rutas dinámicas:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📌 Enlaces Personales Ya Configurados en tu Portafolio
- **GitHub**: [https://github.com/ZLUCK4270](https://github.com/ZLUCK4270)
- **LinkedIn**: [https://www.linkedin.com/in/lucianoac25](https://www.linkedin.com/in/lucianoac25)
- **Correo**: `luciano37017@gmail.com`
- **Institución**: SENATI (Ingeniería de Software con IA, 5to Ciclo)

¡Tu portafolio está optimizado para cargar a máxima velocidad y destacar en cualquier proceso de selección!
