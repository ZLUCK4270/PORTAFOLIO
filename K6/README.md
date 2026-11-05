# 📊 Suite de Pruebas de Rendimiento y Carga con Grafana k6
### Portafolio Profesional de Zenón Luciano Acuña

Esta carpeta contiene una suite completa de pruebas de rendimiento (Performance & Load Testing) desarrolladas con **Grafana k6** para evaluar la resistencia, capacidad de concurrencia y velocidad de respuesta de tu portafolio web.

---

## 🎯 ¿Qué miden estas pruebas?

Con estas pruebas podrás responder con datos y métricas exactas:
1. **¿Cuántas visualizaciones simultáneas (usuarios concurrentes) soporta mi sistema?**
2. **¿A partir de cuántos usuarios concurrentes empieza a ponerse lento o a fallar?** (Punto de quiebre / Bottleneck).
3. **¿Cómo responde si de repente se hace viral o 300 reclutadores entran al mismo tiempo?** (Pico de tráfico).
4. **¿Se mantiene estable después de horas con visitas continuas?** (Fugas de memoria / Memory leaks).

---

## 🗂️ Estructura de la Carpeta `K6/`

| Archivo | Tipo de Prueba | Usuarios Concurrentes (VUs) | Duración | Objetivo |
| :--- | :--- | :---: | :---: | :--- |
| **[`smoke-test.js`](./smoke-test.js)** | Prueba de Humo (Sanidad) | 3 VUs | 30 seg | Verificar que el servidor esté vivo y entregue código 200 OK con latencia < 250ms. |
| **[`load-test.js`](./load-test.js)** | Prueba de Carga Típica | 20 $\rightarrow$ 100 VUs | ~5 min | Medir cuántas visualizaciones concurrentes simultáneas sostiene en tráfico real. |
| **[`stress-test.js`](./stress-test.js)** | Prueba de Estrés (Límite) | 50 $\rightarrow$ 700 VUs | ~10 min | Empujar el sistema al extremo para encontrar su punto de saturación y caída. |
| **[`spike-test.js`](./spike-test.js)** | Prueba de Picos (Viralidad) | 10 $\rightarrow$ 350 en 15s | ~3 min | Evaluar la reacción ante una avalancha súbita y verificar su recuperación. |
| **[`soak-test.js`](./soak-test.js)** | Prueba de Resistencia | 40 VUs constantes | 12 min | Evaluar estabilidad prolongada, fugas de memoria o agotamiento de sockets. |
| **[`config.js`](./config.js)** | Configuración Global | - | - | URL objetivo, headers de navegador real y rutas. |
| **[`reports/`](./reports/)** | Reportes HTML | - | - | Carpeta donde se generan los reportes gráficos interactivos de cada prueba. |

---

## 🛠️ Paso 1: Instalar k6 en Windows

Si aún no tienes k6 instalado en tu computadora, instálalo con cualquiera de estas opciones en tu terminal PowerShell:

### Opción A (Recomendada con Windows Package Manager):
```powershell
winget install k6 --source winget
```

### Opción B (Con Chocolatey):
```powershell
choco install k6
```

### Opción C (Descarga directa):
Descarga el instalador `.msi` oficial desde: [https://dl.k6.io/msi/k6-latest-amd64.msi](https://dl.k6.io/msi/k6-latest-amd64.msi)

Verifica que esté instalado ejecutando:
```powershell
k6 version
```

---

## 🚀 Paso 2: Levantar tu Portafolio para la Prueba

Antes de lanzar k6, necesitas que tu aplicación esté corriendo:

### En Modo Producción Local (Recomendado para medir rendimiento real):
El modo preview sirve el código minificado y optimizado de producción, lo que da resultados idénticos a los de un servidor real:
```powershell
# En una terminal:
npm run build
npm run preview
```
*(Se levantará normalmente en `http://localhost:4173`)*

### O en Modo Desarrollo:
```powershell
npm run dev
```
*(Se levantará en `http://localhost:3000`)*

---

## 🧪 Paso 3: Ejecutar las Pruebas

### 1. Prueba de Humo (Rápida - 30s):
Para comprobar que la URL responde correctamente:
```powershell
# Usando NPM:
npm run k6:smoke

# O directamente con k6:
k6 run K6/smoke-test.js
```

### 2. Prueba de Visualizaciones Concurrentes (Load Test):
Evalúa de 20 a 100 personas visualizando el portafolio a la vez:
```powershell
npm run k6:load
```

### 3. Prueba de Estrés (Stress Test - Busca el límite):
Empuja la carga hasta 700 usuarios simultáneos:
```powershell
npm run k6:stress
```

### 4. Prueba de Picos Súbitos (Spike Test):
Inyecta 350 usuarios de golpe en 15 segundos:
```powershell
npm run k6:spike
```

### 5. Prueba de Resistencia Prolongada (Soak Test):
Mantiene 40 usuarios concurrentes durante más de 10 minutos:
```powershell
npm run k6:soak
```

---

## 🌐 ¿Cómo probar un sitio ya desplegado en Internet (Vercel, Netlify, VPS)?

Puedes apuntar las pruebas a cualquier URL en producción pasando la variable de entorno `TARGET_URL`:

```powershell
# Ejemplo en Vercel:
k6 run -e TARGET_URL=https://tu-portafolio.vercel.app K6/load-test.js

# Ejemplo de estrés a tu dominio propio:
k6 run -e TARGET_URL=https://tu-dominio.com K6/stress-test.js
```

> **Nota ética/técnica:** En plataformas serverless gratuitas (Vercel Free Tier, Netlify Free Tier), realiza las pruebas con moderación para evitar consumir tus cuotas de ancho de banda mensual.

---

## 📈 Reportes Gráficos Interactivos HTML

Cada vez que finaliza una prueba, k6 genera automáticamente un archivo `.html` interactivo en la carpeta:
```
K6/reports/
├── smoke-test-summary.html
├── load-test-summary.html
├── stress-test-summary.html
├── spike-test-summary.html
└── soak-test-summary.html
```

Puedes hacer doble clic en cualquiera de ellos para abrirlo en tu navegador y ver gráficos de:
- Curva de usuarios concurrentes en el tiempo.
- Peticiones por segundo (Throughput).
- Tiempos de respuesta (Percentil 95 y 99).
- Lista de checks aprobados y fallidos.

---

## 🧠 ¿Cómo interpretar los Resultados de k6?

Cuando k6 termine en la consola, verás una tabla con métricas. Las más importantes son:

| Métrica | Significado | Valor Ideal |
| :--- | :--- | :--- |
| **`vus_max`** | Máximo número de usuarios virtuales visualizando el sitio a la vez. | Según el test (50, 100, 500) |
| **`http_req_duration`** | Tiempo total en responder la petición: | |
| $\rightarrow$ **`avg`** | Tiempo promedio de respuesta. | `< 200 ms` |
| $\rightarrow$ **`p(95)`** | El 95% de los usuarios experimentó este tiempo o menos. | `< 500 ms` (Excelente) |
| $\rightarrow$ **`p(99)`** | El 99% de los usuarios experimentó este tiempo o menos. | `< 1,000 ms` |
| **`http_req_failed`** | Porcentaje de solicitudes que fallaron (errores 500, 502, timeouts). | `0.00%` (Menos del 1%) |
| **`http_reqs`** | Total de solicitudes procesadas y tasa por segundo (req/s). | Cuanto más alto, mejor |

### Ejemplo de Diagnóstico:
* **Si `http_req_failed` es 0% y `p(95)` < 300ms:** Tu sistema soporta esa cantidad de visualizaciones concurrentes con absoluta fluidez.
* **Si `p(95)` sube a más de 2000ms (2s):** El servidor empieza a encolar peticiones (se siente lento para el visitante).
* **Si aparecen errores en `http_req_failed` (> 5%):** Has alcanzado el punto de quiebre (el servidor rechazó conexiones o agotó sus recursos de CPU/RAM).

