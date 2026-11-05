import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, DEFAULT_HEADERS } from './config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SMOKE TEST (Prueba de Humo)
 * Objetivo: Validar que el servidor esté activo, responda con código 200 OK
 * y sirva la página inicial sin errores bajo una carga mínima (1 a 3 usuarios).
 */
export const options = {
  vus: 3,
  duration: '30s',
  thresholds: {
    // El 99% de las solicitudes deben responder en menos de 300ms
    http_req_duration: ['p(99)<300'],
    // 0% de errores permitidos en la prueba de humo
    http_req_failed: ['rate==0'],
  },
};

export default function () {
  const res = http.get(BASE_URL, { headers: DEFAULT_HEADERS });

  // Validaciones
  check(res, {
    'Estado HTTP es 200': (r) => r.status === 200,
    'Cuerpo contiene HTML': (r) => r.body && r.body.includes('<!DOCTYPE html>'),
    'Carga el bundle de la aplicación': (r) => r.body && r.body.includes('src/main.tsx') || r.body.includes('/assets/'),
    'Latencia inferior a 250ms': (r) => r.timings.duration < 250,
  });

  // Tiempo de pensamiento del usuario (1 a 2 segundos)
  sleep(1);
}

export function handleSummary(data) {
  return {
    'K6/reports/smoke-test-summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

