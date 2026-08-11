import { prisma } from "@/lib/prisma.js";
import { ApiError } from "@/lib/ApiError.js";
import { comparePassword, hashPassword } from "@/lib/password.js";
import { signToken } from "@/lib/jwt.js";
import type { LoginInput, RegisterInput } from "@/features/auth/auth.schema.js";

function toPublicUser<T extends { passwordHash: string }>(user: T) {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw ApiError.conflict("Já existe uma conta com este email");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash },
  });

  const token = signToken({ sub: user.id, email: user.email });
  return { user: toPublicUser(user), token };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw ApiError.unauthorized("Email ou senha inválidos");
  }

  const isValid = await comparePassword(input.password, user.passwordHash);
  if (!isValid) {
    throw ApiError.unauthorized("Email ou senha inválidos");
  }

  const token = signToken({ sub: user.id, email: user.email });
  return { user: toPublicUser(user), token };
}

export async function getMe(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw ApiError.notFound("Usuário não encontrado");
  }
  return toPublicUser(user);
}
