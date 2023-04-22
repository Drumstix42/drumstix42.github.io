import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

const outDir = resolve(__dirname, 'dist');
const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), alias()],
    resolve: {
        alias: {
            '@': resolve(projectRootDir, 'src'),
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
