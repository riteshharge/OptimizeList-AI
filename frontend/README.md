# React + Vite Starter Template

This project provides a lightweight starting point to build React applications using Vite. It comes with hot module replacement (HMR) and basic ESLint rules preconfigured for development.

---

## Available Official Plugins

Two main plugins are supported to improve React development experience:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)**  
  Uses **Babel** (or **OXC** when used with [rollup-vite](https://vite.dev/guide/rolldown)) to enable Fast Refresh during development.

- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)**  
  Uses **SWC** for fast and efficient Fast Refresh without Babel.

---

## React Compiler

This template does not include the React Compiler by default due to potential impacts on build and development speed.  
To enable the React Compiler, follow the instructions in the [official React documentation](https://react.dev/learn/react-compiler/installation).

---

## ESLint Configuration

For production-level applications, we recommend using **TypeScript** along with type-aware linting rules for stricter checks and safer code.  
You can refer to the [React + TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for guidance on integrating TypeScript and **`typescript-eslint`** into your project.

---
