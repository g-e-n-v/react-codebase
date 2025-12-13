# React Codebase

**React** offers immense flexibility, but without a shared architecture, projects can easily become inconsistent and difficult to maintain as they scale.

This repository provides a **production-ready foundation** for React applications. It combines a scalable project structure with a curated set of tools to ensure consistency, performance, and developer productivity. The goal is to provide a sensible starting point that teams can adopt and adapt, rather than a rigid framework.

**Core Principles:**

- **Scalable Architecture:** Clear boundaries and one-way dependency flows.
- **Developer Experience:** Easy onboarding, consistent conventions, and automated tooling.
- **Maintainability:** Simple to reason about, with a focus on long-term health.
- **Performance & Quality:** Built-in best practices for security, speed, and error prevention.  

## 📚 Documentation

Detailed documentation can be found in the `docs/` directory:

- [**Project Structure**](./docs/01-project-structure.md): Detailed explanation of the scope-based architecture (`routes`, `modules`, `features`, `shared`, `app`).
- [**Standards & Best Practices**](./docs/02-standards.md): Coding standards, naming conventions, linting rules, and git hooks.

## 🏗️ Project Structure Overview

This project follows a **scope-based architecture** designed for scalability and maintainability.

```plain
src/
├── routes/     # File-based routing (pages, layouts)
├── app/        # Global config, styles, and providers
├── modules/    # Large, self-contained domains (low reusability)
├── features/   # Reusable business features (high reusability)
└── shared/     # Generic utilities and UI components (no business logic)
```

Key dependency rule: **One-way flow**. `routes` depends on everything. `shared` depends on nothing.

## 🛡️ Development Standards

We use **BiomeJS** for linting and formatting, and **Lefthook** for git hooks.

- **Strict Imports**: No relative parent imports (`../`). Always use absolute paths from `src/`.
- **Naming**: PascalCase for components/types, camelCase for functions/vars.
- **Formatting**: 2 spaces indent, 120 chars line width.
- **Git Hooks**: Pre-commit checks for linting and types.

## 🚀 Getting Started

1. **Install dependencies**:

    ```bash
    pnpm install
    ```

2. **Start the development server**:

    ```bash
    pnpm dev
    ```

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the application for production |
| `pnpm start` | Preview the production build |
| `pnpm check:lint` | Run BiomeJS linting and formatting checks |
| `pnpm check:type` | Run TypeScript type checking |

## Disclaimer

This repository is not meant to be a strict rulebook. You are not required to follow every decision exactly as presented here. Evaluate what makes sense for your use case and your team, adjust where necessary, and most importantly, stay consistent with the conventions you choose.
