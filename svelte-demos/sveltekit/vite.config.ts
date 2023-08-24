import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [isoImport(), sveltekit()]
});
