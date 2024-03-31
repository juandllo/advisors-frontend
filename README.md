# Advisors Frontend

WebApplication que permite realizar la gestión de los pedidos que realizan los asesores, administrar saldos pendientes de los asesores, configuración de usuarios para los asesores, administrar los estados de los pedidos de los asesores y gestión de tickets de los asesores.

## Librerías
La aplicación esta construida utilizando las siguientes librerías y componentes.

* Vite 5.2.0 https://vitejs.dev/guide/
* Typescript 5.2.2
* React 18.2.0
* TailwindCSS 3.4.3 https://tailwindui.com/
* Radix-ui 
* Shadcn https://ui.shadcn.com/

## Configuración y Ejecución
Para ejecutar la aplicación es necesario tener configurado **`Node`** en la versión **`20.x.x`** https://nodejs.org/en. Una vez configurado **`Node`** debemos ejecutar los siguientes comandos.

### Gestor de Dependencias
El gestor de dependencias sugerido para el proyecto es **`pnpm`**. Seguir la documentación oficial para su instalación y configuración https://pnpm.io/es/installation.

### Instalar Dependencias
```bash 
pnpm install
```

### Ejecutar Aplicación
```bash
pnpm run dev
```

### Instalar Componentes Shadcn
Para instalar los componentes utilizados desde **`Shadcn`** se debe ejecutar el siguiente comando.
```bash
pnpm dlx shadcn-ui@latest add [COMPONENT_NAME]
```

> Consulta la documentación de [Shadcn](https://ui.shadcn.com/docs) para información adicional de componentes y su uso.

## Estructura del Proyecto

```bash
📦 
├─ 📁public
├─ 📁src
│  ├─ 📁assets
│  ├─ 📁componentes
│  │  └─ 📁ui
│  ├─ 📁lib
│  ├─ 📁pages
│  ├─ 📁theme
│  ├─ 📄App.css
│  ├─ 📄App.tsx
│  ├─ 📄index.css
│  ├─ 📄main.tsx
│  └─ 📄vite-env.d.ts
├─ 📄components.json
├─ 📄index.html
├─ 📄package.json
├─ 📄pnpm-lock.yaml
├─ 📄postcss.config.js
├─ 📄README.md
├─ 📄tailwind.config.js
├─ 📄tsconfig.json
├─ 📄tscofing.node.json
└─ 📄vite.config.ts
```