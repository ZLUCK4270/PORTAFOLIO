import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, DEFAULT_HEADERS } from './config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SOAK TEST (Prueba de Resistencia / Resistencia Prolongada)
 * Objetivo: Evaluar la estabilidad y degradación del servidor a lo largo del tiempo.
 * Detecta fugas de memoria (memory leaks), agotamiento de conexiones socket
 * o saturación gradual de CPU bajo tráfico sostenido continuo.
 */
export const options = {
  stages: [
    { duration: '1m',  target: 40 },  // Rampa de subida a 40 usuarios concurrentes
    { duration: '10m', target: 40 },  // Sostener 40 usuarios constantes durante 10 minutos
    { duration: '1m',  target: 0 },   // Rampa de bajada
  ],
  thresholds: {
    // Rendimiento sostenido estable: 95% de solicitudes en menos de 450ms
    http_req_duration: ['p(95)<450'],
    // Cero tolerancia a acumulación de errores
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(BASE_URL, { headers: DEFAULT_HEADERS });

  check(res, {
    'Estado 200 constante': (r) => r.status === 200,
    'Sin degradación de latencia': (r) => r.timings.duration < 500,
  });

  // Pausa realista entre 2 y 5 segundos por usuario
  sleep(Math.random() * 3 + 2);
}

export function handleSummary(data) {
  return {
    'K6/reports/soak-test-summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

