// Importe o process
import process from "node:process";

export default {
  async fetch(request, env, ctx) {
    // Injeta as variáveis no process.env para o Bolt.diy conseguir ler
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = env.GOOGLE_GENERATIVE_AI_API_KEY;

    const context = new RouterContextProvider() as RouterContextProvider & {
      cloudflare: { env: Env; ctx: ExecutionContext };
    };

    context.cloudflare = { env, ctx };

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
