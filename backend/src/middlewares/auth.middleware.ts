import type { NextFunction, Request, Response } from "express";
import { ApiError } from "@/lib/ApiError.js";
import { verifyToken } from "@/lib/jwt.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    throw ApiError.unauthorized();
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    throw ApiError.unauthorized("Token inválido ou expirado");
  }
}
