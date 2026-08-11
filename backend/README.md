# Promise API

Backend do projeto Promise: Node.js + Express + TypeScript + Prisma (PostgreSQL) + Socket.io.

## Stack

- Express (HTTP API)
- Prisma ORM + PostgreSQL
- Zod (validação de entrada)
- JWT (autenticação via `Authorization: Bearer <token>`)
- bcryptjs (hash de senha)
- Multer (upload de fotos)
- Socket.io (mensagens em tempo real no chat)

## Estrutura

```
backend/
  prisma/
    schema.prisma      # modelos do banco
    seed.ts             # dados de exemplo
  src/
    config/env.ts        # leitura e validação das env vars
    lib/                  # prisma client, jwt, hash de senha, ApiError, asyncHandler
    middlewares/          # auth, upload, tratamento de erros
    features/
      auth/                # registro, login, /me
      profile/             # perfil do usuário logado, fotos, hobbies
      feed/                # posts, likes, comentários
      match/               # descobrir perfis, swipe, matches
      chat/                # contatos, mensagens (REST) + socket.io
    routes/index.ts       # agrega as rotas de cada feature em /api
    app.ts                 # configuração do express
    server.ts              # bootstrap do http server + socket.io
```

Cada feature segue o padrão `*.schema.ts` (validação) → `*.service.ts` (regra de negócio/Prisma) → `*.controller.ts` (request/response) → `*.routes.ts`.

## Como rodar

```bash
cd backend
pnpm install          # ou npm install / yarn
cp .env.example .env

docker compose up -d postgres   # sobe o Postgres (na raiz do projeto)
pnpm prisma:generate
pnpm prisma:migrate             # aplica o schema no banco
pnpm seed                       # popula com usuários/posts de exemplo

pnpm dev              # inicia em http://localhost:3333
```

Usuários de exemplo criados pelo seed (senha `123456`): `maria@example.com`, `joao@example.com`, `carla@example.com`.

## Endpoints principais

Todas as rotas ficam sob `/api`. Rotas privadas exigem o header `Authorization: Bearer <token>` retornado por `/auth/login` ou `/auth/register`.

| Método | Rota                          | Descrição                          |
|--------|-------------------------------|-------------------------------------|
| POST   | /auth/register                | Cria conta                          |
| POST   | /auth/login                   | Login                               |
| GET    | /auth/me                      | Usuário autenticado                 |
| GET    | /profiles/me                  | Meu perfil                          |
| PATCH  | /profiles/me                  | Atualiza meu perfil                 |
| POST   | /profiles/me/photos           | Upload de foto (multipart `photo`)  |
| DELETE | /profiles/me/photos/:photoId  | Remove foto                         |
| GET    | /profiles/:id                 | Perfil público de um usuário        |
| GET    | /feed                         | Lista posts (paginação por cursor)  |
| POST   | /feed                         | Cria post                           |
| DELETE | /feed/:postId                 | Remove post (autor)                 |
| POST   | /feed/:postId/like            | Curtir/descurtir (toggle)           |
| POST   | /feed/:postId/comments        | Comenta em um post                  |
| GET    | /matches/discover              | Perfis para dar swipe               |
| POST   | /matches/swipe                 | Envia swipe (`targetId`, `liked`)   |
| GET    | /matches                       | Lista matches                       |
| GET    | /chat/contacts                 | Lista conversas (a partir dos matches) |
| GET    | /chat/:matchId/messages        | Histórico de mensagens              |
| POST   | /chat/:matchId/messages        | Envia mensagem (emite via socket.io)|

## Realtime (Socket.io)

Conecte com o token JWT:

```ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3333", { auth: { token } });
socket.on("message:new", (message) => { /* ... */ });
```

Ao enviar uma mensagem via `POST /chat/:matchId/messages`, o destinatário recebe o evento `message:new` em tempo real.

## Integração com o frontend

O frontend (raiz do repositório) roda em `http://localhost:3000` (Vite). Ajuste `CORS_ORIGIN` no `.env` do backend se a porta mudar. As entidades (`PostType`, `ContactType`, `UserProfile`, `Msg`) foram usadas como base para o schema do Prisma, então o formato dos dados deve ficar próximo do que os componentes do frontend já esperam — pequenos ajustes de mapeamento podem ser necessários ao plugar os serviços mock (`src/features/*/api`) nesta API.
