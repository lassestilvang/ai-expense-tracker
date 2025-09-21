# GEMINI.md

## Project Overview

This is a simple expense tracker application built with Next.js and TypeScript. It allows users to add, view, and filter their expenses. The application uses local storage to persist the expense data.

The project is structured as a standard Next.js application, with the main page at `src/app/page.tsx`. It uses a custom hook `useExpenses` to manage the expense data, which is stored in the browser's local storage. The UI is built with React and `shadcn/ui` components, and it includes features like a dashboard, an expense form, a list of expenses, and filtering controls.

## Building and Running

### Prerequisites
- Node.js and npm installed.

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production
```bash
npm run build
```

### Running in Production Mode
```bash
npm run start
```

### Linting
```bash
npm run lint
```

## Development Conventions
**IMPORTANT**: Before making any changes, create and checkout a feature branch named `feature-[brief-description]`

### Coding Style
The project uses TypeScript and follows standard React best practices. The code is well-formatted and uses `eslint` for linting.

### Component Structure
The UI is built with a clear component structure. The main components are:
- `Header`: The main header of the application.
- `Dashboard`: Displays a summary of the expenses.
- `ExpenseForm`: A form to add new expenses.
- `ExpenseList`: Displays a list of expenses.
- `FilterControls`: Provides controls to filter the expenses.

### State Management
The application's state is managed by the `useExpenses` custom hook, which handles all CRUD operations for the expenses and syncs the data with the local storage.

### Data Persistence
The expense data is persisted in the browser's local storage. The `src/lib/storage.ts` file contains the functions to load and save the expenses.

### Types
The data types are defined in `src/types/index.ts`. The main types are `Expense` and `Category`.
