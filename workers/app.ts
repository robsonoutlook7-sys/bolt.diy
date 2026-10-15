import { createRequestHandler, RouterContextProvider, type ServerBuild } from 'react-router';
import process from 'node:process';

declare global {
  interface CloudflareEnvironment extends Env {}
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build') as unknown as Promise<ServerBuild>,
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    if (env.GOOGLE_GENERATIVE_AI_API_KEY) {
      process.env.GOOGLE_GENERATIVE_AI_API_KEY = env.GOOGLE_GENERATIVE_AI_API_KEY;
    }

    const context = new RouterContextProvider() as RouterContextProvider & {
      cloudflare: { env: Env; ctx: ExecutionContext };
    };

    context.cloudflare = { env, ctx };

    return requestHandler(request, context);
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
