/* eslint-disable global-require */
export const content = [
  './public/**/*.html',
  './pages/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './node_modules/tw-elements/dist/js/**/*.js',
  './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
];
export const plugins = [require('tw-elements/dist/plugin.cjs')];

export const darkMode = 'class';
