import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// export default {
//     base: './',
//     plugins: [vue()],
//     optimizeDeps: {
//         include: ['schart.js']
//     },
//     // proxy:
//     chunkSizeWarningLimit:1500,
//
// }
export default defineConfig({
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },

    // proxy:
    build: {
        chunkSizeWarningLimit:1500,
        // rollupOptions: {
        //     output: {
        //         //解决打包时Some chunks are larger警告
        //         manualChunks(id) {
        //             if (id.includes('node_modules')) {
        //                 return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //             }
        //         }
        //     }
        // }
    }

});


