#Setup React, TypeScript in laravel 12 project

1. Create new project and cd to the new project
2. Run this to setup inertia server-side in laravel 12

```
composer require inertiajs/inertia-laravel
```

3. Create app.blade.php in /views

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        <!-- In this article, we are going to use JSX syntax for React components -->
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
```

4. Create its middleware via
   `php artisan inertia:middleware`

5. Register middleware via

```
$middleware->web(append: [
            HandleInertiaRequests::class
        ]);
```

6. Give Client-side setup with npm via

```
npm install @inertiajs/react react react-dom
npm install -D @types/react @types/react-dom typescript @vitejs/plugin-react
```

7. update vite.config.js like this

```
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
});
```

8. Inside the “resources/js” folder, delete the app.js and create a new file named “app.tsx” with the next code inside

```
import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot} from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    // Below you can see that we are going to get all React components from resources/js/Pages folder
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`,import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
```

9. create tsconfig.json

```
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  },
  "include": ["resources/js/**/*"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
and tsconfig.node.json
```
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.js"]
}
```

10. To call pages create resources/js/Pages/Index.tsx like this.

11. In controller call inertia like this.

```
 public function index()
    {
        // Here we provide posts from the database to prop that we created in component
        return Inertia::render('Index', [
            'posts' => Post::all()
        ]);
    }
```
12. Tuotrial link https://medium.com/@demian.kostelny/laravel-inertia-js-react-simple-crud-example-2e0d167365d
"# Custom-Auth-with-react-typescript-laravel-12" 
