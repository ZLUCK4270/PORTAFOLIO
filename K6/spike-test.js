import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, DEFAULT_HEADERS } from './config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * SPIKE TEST (Prueba de Picos Repentinos / Tráfico Viral)
 * Objetivo: Evaluar la reacción del sistema ante una avalancha súbita de visitas
 * (ejemplo: publicación viral en LinkedIn, Reddit o un evento en vivo) y comprobar
 * si se recupera rápidamente una vez que el pico de tráfico desciende.
 */
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Tráfico basal normal (10 usuarios)
    { duration: '15s', target: 350 },  // ¡PICO INMEDIATO! De 10 a 350 usuarios en 15 segundos
    { duration: '1m',  target: 350 },  // Mantener el pico viral por 1 minuto
    { duration: '20s', target: 10 },   // Caída rápida al tráfico basal
    { duration: '1m',  target: 10 },   // Período de recuperación: verificar que vuelve a la normalidad
    { duration: '15s', target: 0 },    // Cierre
  ],
  thresholds: {
    // Al menos el 85% de las solicitudes deben responder en menos de 1.5s durante el pico
    http_req_duration: ['p(85)<1500'],
    // La tasa de errores durante la avalancha no debe sobrepasar el 5%
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get(BASE_URL, { headers: DEFAULT_HEADERS, timeout: '8s' });

  check(res, {
    'Estado 200 en pico': (r) => r.status === 200,
    'Contenido entregado': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'K6/reports/spike-test-summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

