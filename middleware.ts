import { withAuth } from "next-auth/middleware";

// Export the middleware
export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

// Protect all routes except auth and api
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - auth (auth pages)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
