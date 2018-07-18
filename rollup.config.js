import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    name: 'beadstudio',
    file: 'beadstudio.js',
    format: 'iife'
  },
  plugins: [
    babel({
      include: 'src/**',
      plugins: ['external-helpers']
    })
  ]
};
