import { resolve } from 'node:path'

export default {
    base: './',
    mode: 'production',
    build: {
        target: 'es2015',
        outDir: 'dist',
        lib: {
            entry: 'src/index.js',
            formats: ['cjs'],
            fileName: 'index'
        },
        rollupOptions: {
            external: [
                'tabris',
                'string-tocapitalize'
            ]
        },
        watch: false,
        minify: true,
    },
    esbuild: {
        jsxFactory: 'JSX.createElement'
    }
}