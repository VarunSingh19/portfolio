import { NextRequest } from "next/server";

// Admin configuration from environment variables
const ADMIN_CONFIG = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminName: process.env.ADMIN_NAME,
  allowedAuthors: process.env.ALLOWED_AUTHORS?.split(",") ?? [], // Comma-separated list
};

// Check if the user is authorized to perform admin actions
export function isAuthorizedAdmin(authorName: string): boolean {
  return ADMIN_CONFIG.allowedAuthors.includes(authorName);
}

// Check if a blog can be modified by the current context
export function canModifyBlog(blogAuthor: string): boolean {
  // Only allow modification of blogs by authorized authors
  return ADMIN_CONFIG.allowedAuthors.includes(blogAuthor);
}

// Validate admin access for API routes
export function validateAdminAccess(req: NextRequest): {
  isValid: boolean;
  error?: string;
} {
  // For now, we'll use a simple approach
  // In production, you should implement proper JWT or session validation

  // Check for admin header (you can customize this)
  // const adminHeader = req.headers.get("x-admin-access");
  const userAgent = req.headers.get("user-agent");

  // Basic validation - you should enhance this
  if (!userAgent || userAgent.includes("bot")) {
    return {
      isValid: false,
      error: "Invalid request source",
    };
  }

  // For now, allow access (you should implement proper auth)
  return {
    isValid: true,
  };
}

// Security headers for admin routes
export const ADMIN_SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// Log security events
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>
) {
  console.log(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    ...details,
  });
}
