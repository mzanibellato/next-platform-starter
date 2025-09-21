import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Genera nonce casuale
  const nonce = Math.random().toString(36).substring(2, 15);

const csp = `
  default-src 'none';
  script-src 'self' 'nonce-${nonce}';
  style-src 'self' 'nonce-${nonce}' https://cdnjs.cloudflare.com https://fonts.googleapis.com;
  img-src 'self' https://ioninteractive.com https://cdnjs.cloudflare.com;
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://r2cdn.perplexity.ai;
  connect-src 'self' https://api.example.com https://cdnjs.cloudflare.com;
  frame-src 'none';
  worker-src 'self';
`.replace(/\s+/g, ' ').trim();


  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-csp-nonce', nonce);

  return response;
}
