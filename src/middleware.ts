import { NextResponse } from 'next/server';

const locales = ['cs', 'sk'];
const defaultLocale = 'cs';

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
  const localePart = request.nextUrl.pathname.split('/')[1].toLowerCase();

  if (!locales.includes(localePart)) {
    return defaultLocale;
  }

  return localePart;
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  console.log(pathname);

  if (!pathname.startsWith(`/exodus`)) {
    return;
  }

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/exodus/${locale}`));

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  const restOfPath = pathname.substring('/exodus'.length);
  request.nextUrl.pathname = `/exodus/${locale}${restOfPath}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/api/auth/:path*'],
};
