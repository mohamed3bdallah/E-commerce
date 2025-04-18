// filepath: /d:/the D file/E-commerce app/src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Client,

  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client,

  },
];
