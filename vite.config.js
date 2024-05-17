import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx'; // Importa el plugin necesario, por ejemplo, para JSX

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(), // Añade el plugin aquí
  ],
});
