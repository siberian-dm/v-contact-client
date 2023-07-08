import path from 'path';
import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    EnvironmentPlugin('all', { prefix: 'VITE_' }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~app': path.resolve('src/app'),
      '~entities': path.resolve('src/entities'),
      '~features': path.resolve('src/features'),
      '~pages': path.resolve('src/pages'),
      '~shared': path.resolve('src/shared'),
      '~widgets': path.resolve('src/widgets'),
    },
  },
});
