import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { BASE_URL, DEFAULT_HEADERS } from './config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

/**
 * LOAD TEST (Prueba de Visualizaciones Concurrentes / Carga Típica)
 * Objetivo: Evaluar cuántas visualizaciones simultáneas soporta el sistema en condiciones
 * de tráfico normal y alto (hasta 100 usuarios activos al mismo tiempo).
 */

const pageLoadTrend = new Trend('tiempo_carga_pagina');
const successfulViewsCounter = new Counter('total_visualizaciones_exitosas');
const errorRate = new Rate('tasa_errores');

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Rampa de subida: 20 usuarios concurrentes
    { duration: '1m',  target: 50 },  // Aumentar a 50 usuarios concurrentes
    { duration: '2m',  target: 100 }, // Carga alta: 100 usuarios visualizando a la vez
    { duration: '1m',  target: 100 }, // Mantener los 100 usuarios estables
    { duration: '30s', target: 0 },   // Rampa de bajada gradual
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1200'],
    http_req_failed: ['rate<0.01'],
    tasa_errores: ['rate<0.01'],
    tiempo_carga_pagina: ['p(90)<600'],
  },
};

export default function () {
  group('Visualización del Portafolio', function () {
    const startTime = new Date().getTime();
    const res = http.get(BASE_URL, { headers: DEFAULT_HEADERS });
    const duration = new Date().getTime() - startTime;

    pageLoadTrend.add(duration);

    const isSuccess = check(res, {
      'Código HTTP es 200': (r) => r.status === 200,
      'Tiempo de respuesta aceptable (<600ms)': (r) => r.timings.duration < 600,
      'Documento HTML completo': (r) => r.body && r.body.length > 200,
    });

    if (isSuccess) {
      successfulViewsCounter.add(1);
      errorRate.add(0);
    } else {
      errorRate.add(1);
    }
  });

  // Simulación de tiempo de lectura (Think Time)
  sleep(Math.random() * 2 + 2);
}

export function handleSummary(data) {
  return {
    'K6/reports/load-test-summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
