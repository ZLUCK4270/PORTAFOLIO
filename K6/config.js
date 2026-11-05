/**
 * Configuración global compartida para pruebas de rendimiento con Grafana k6
 * Portafolio Profesional - Zenón Luciano Acuña
 */

// Normalizar la URL base asegurando que termine con '/'
const rawUrl = __ENV.TARGET_URL || 'http://localhost:3000';
export const BASE_URL = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;

// Headers realistas que simulan un navegador moderno (Chrome en Windows)
export const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none'
};
