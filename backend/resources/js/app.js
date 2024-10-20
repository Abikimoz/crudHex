import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: name => {
    // Замена import.meta.glob на require.context - подходит для Webpack
    const pages = require.context('./Pages', true, /\.jsx$/);
    return pages(`./${name}.jsx`).default;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
