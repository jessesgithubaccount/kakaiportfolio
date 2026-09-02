import { defineConfig } from 'astro/config';

import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  adapter: netlify(),
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
  },
});
