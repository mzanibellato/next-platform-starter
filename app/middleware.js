import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Genera un nonce semplice (puoi cambiare con un metodo sicuro)
  const nonce = Math.random().toString(36).substring(2, 15);

  // Costruisci la policy CSP tirando fuori spazi inutili
  const csp = `
    default-src 'none';
    script-src 'self' 'nonce-${nonce}';
    style-src 'self' 'nonce-${nonce}' https://cdnjs.cloudflare.com;
    img-src 'self' https://ioninteractive.com;
    font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
    connect-src 'self' https://api.example.com https://cdnjs.cloudflare.com;
    frame-src 'none';
    worker-src 'self';
  `.replace(/\s+/g, ' ').trim();

  // Imposta header CSP
  response.headers.set('Content-Security-Policy', csp);

  // Per ora metti il nonce in un header custom per recuperarlo nel client React
  response.headers.set('x-csp-nonce', nonce);

  return response;
}
