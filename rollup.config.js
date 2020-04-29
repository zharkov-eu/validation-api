import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [typescript({ module: 'es6' })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.es5.js',
      format: 'cjs',
    },
    plugins: [typescript({ target: 'es5', module: 'es6', lib: ['es2015', 'es2015.reflect'] })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts({ banner: false })],
  },
];
