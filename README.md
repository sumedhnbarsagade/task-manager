# Task Manager

A modern, responsive Task Manager application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Create Tasks**: Add new tasks with title, description, and priority.
- **View Tasks**: View a list of tasks with filtering (All/Active/Completed) and sorting.
- **Update Status**: Toggle completion status of tasks.
- **Edit Tasks**: Inline editing of task titles.
- **Delete Tasks**: Remove tasks from the list.
- **Persistence**: Data is saved to LocalStorage, so your tasks persist across reloads.
- **Responsive Design**: Works seamlessly on desktop and mobile.
- **Dark Mode Support**: Automatically respects your system's color scheme preference.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context + Hooks

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Task-Manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

To create a production build:

```bash
npm run build
npm start
```

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (TaskForm, TaskList, TaskItem).
- `src/context`: React Context for state management.
- `src/types`: TypeScript type definitions.
