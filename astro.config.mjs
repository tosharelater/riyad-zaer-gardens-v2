// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.BASE || '/';

export default defineConfig({
  site: process.env.BASE ? 'https://tosharelater.github.io' : 'https://riyadzaergardens.com',
  base,
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});
