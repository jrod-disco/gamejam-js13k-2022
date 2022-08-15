import html from 'rollup-plugin-html2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProd = process.env.BUILD === 'prod';
const isDev = process.env.BUILD === 'dev';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: './dist/index.js',
        format: 'iife',
        globals: {
          'kontra.js': 'KONTRA',
        },
      },
    ],
    plugins: [
      resolve({ base: 'src', browser: true, preferBuiltins: false }),
      replace({
        preventAssignment: true,
        __VERSION__: JSON.stringify(pkg.version),
        __DCOVERSION__: JSON.stringify(pkg.dcoversion),
      }),
      commonjs({}),
      html({ template: './src/index.html', inject: false }),
      isProd && terser(),
      copy({
        targets: [
          {
            src: './src/assets/*',
            dest: 'dist/assets/',
          },
        ],
      }),
      isDev && serve('dist/'),
      isDev && livereload(),
    ],
  },
];
