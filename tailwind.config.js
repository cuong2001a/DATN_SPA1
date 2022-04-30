module.exports = {
  purge: ['./public/index.html', './src/*.jsx', './src/**/*.jsx', './src/**/**/*.jsx'],

  content: ['./src/**/*.{html,js,jsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['"Roboto Slab"', 'serif'],
      body: ['Roboto', 'sans-serif'],
      nunito: ['Nunito'],
      spa: ['Playfair Display SC', 'Helvetica', 'sans-serif'],
      'plex-sans': ['IBM Plex Sans Condensed', 'sans-serif'],
      'home-customer': ['Playfair Display', 'serif']
    },
    extend: {}
  },
  variants: {
    opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
    translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    backgroundSize: ['responsive', 'hover', 'focus'],
    objectFit: ['responsive', 'hover', 'focus'],
    rotate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    backgroundAttachment: ['responsive', 'hover', 'focus'],
    margin: ['responsive', 'hover', 'focus'],
    display: ['responsive', 'hover', 'focus', 'group-hover'],
    flexGrow: ['responsive', 'hover', 'focus'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    fontFamily: ['responsive', 'hover', 'focus'],
    zIndex: ['responsive', 'hover', 'focus', 'group-hover'],
    width: ['responsive', 'hover', 'focus', 'group-hover'],
    height: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp')
    // ...
  ]
};
