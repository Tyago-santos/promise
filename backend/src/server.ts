import http from "node:http";
import { app } from "@/app.js";
import { env } from "@/config/env.js";
import { initChatGateway } from "@/features/chat/chat.gateway.js";

const httpServer = http.createServer(app);
initChatGateway(httpServer);

httpServer.listen(env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${env.PORT}`);
});
