import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';
import { BASE_URL, DEFAULT_HEADERS } from './config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * STRESS TEST (Prueba de Estrés / Capacidad Máxima y Punto de Quiebre)
 * Objetivo: Encontrar el límite absoluto del sistema. Aumenta la carga progresivamente
 * hasta 500+ usuarios concurrentes para identificar cuándo se satura el servidor,
 * cuándo aparecen timeouts y cómo se degrada la velocidad de respuesta.
 */

const requestDurationTrend = new Trend('duracion_bajo_estres');
const failedRequestsCounter = new Counter('peticiones_fallidas_estres');

export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Calentamiento a 50 usuarios
    { duration: '2m', target: 150 },  // Carga moderada-alta a 150 usuarios
    { duration: '2m', target: 300 },  // Estrés inicial: 300 usuarios simultáneos
    { duration: '2m', target: 500 },  // Estrés máximo: 500 usuarios simultáneos
    { duration: '1m', target: 700 },  // Pico extremo: buscar el punto de quiebre (700 VUs)
    { duration: '2m', target: 0 },    // Enfriamiento gradual
  ],
  thresholds: {
    // Monitoreo de degradación: bajo estrés extremo el p95 no debería superar 2.5s
    http_req_duration: ['p(95)<2500'],
    // La tasa de errores debería mantenerse por debajo del 10% aún bajo estrés
    http_req_failed: ['rate<0.10'],
  },
};

export default function () {
  const res = http.get(BASE_URL, {
    headers: DEFAULT_HEADERS,
    timeout: '10s' // Timeout de 10 segundos para peticiones lentas
  });

  requestDurationTrend.add(res.timings.duration);

  const ok = check(res, {
    'Servidor respondió': (r) => r.status > 0,
    'Código es 200 o 304': (r) => r.status === 200 || r.status === 304,
    'Respuesta antes de 2000ms': (r) => r.timings.duration < 2000,
  });

  if (!ok) {
    failedRequestsCounter.add(1);
  }

  // Think time corto (0.5 a 1.5s) para simular alta presión sobre el backend
  sleep(Math.random() * 1 + 0.5);
}

export function handleSummary(data) {
  return {
    'K6/reports/stress-test-summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

