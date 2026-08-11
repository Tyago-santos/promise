import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function HeadManager() {
  const routerState = useRouterState();

  useEffect(() => {
    // Acessa as matches corretamente
    const matches = routerState.matches;

    // Encontra configuração head da rota mais específica
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i];
      const context = match.context as any; // Cast para any ou use o tipo correto

      if (context?.head?.meta?.[0]) {
        const meta = context.head.meta[0];

        // Atualiza título
        if (meta.title) {
          document.title = meta.title;
        }

        // Atualiza meta tags
        updateMetaTags(meta);
        break;
      }
    }
  }, [routerState.matches]);

  return null;
}

// Função auxiliar
function updateMetaTags(meta: any) {
  // Meta description
  if (meta.description) {
    updateMetaTag("description", meta.description);
  }

  // Meta keywords
  if (meta.keywords) {
    updateMetaTag("keywords", meta.keywords);
  }
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}
