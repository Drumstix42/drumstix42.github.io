import vue from '@vitejs/plugin-vue';
/* import mpa from 'vite-plugin-mpa'; */
import { defineConfig } from 'vite';
import { resolve } from 'path';

const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        /* mpa({
            open: '/',
        }), */
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                icarus: resolve(__dirname, 'icarus/index.html'),
            },
        },
    },
});
