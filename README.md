# Task Manager (React + Vite)
A simple task manager built with React and Vite. Features include adding tasks, marking them as completed, deleting tasks, filtering by status, and viewing task statistics.
Features

Add tasks using the input field and Enter key.
Clear input with Escape.
Toggle task completion via checkbox.
Delete tasks with the delete button.
Filter tasks: All, Active, Completed.
Clear all completed tasks.
View stats: Total, Active, Completed.

# Tech Stack

React (Vite)
Jest + React Testing Library for testing
Babel for JSX/ESM support in tests

# Project Structure
src/
  components/      # TaskInput, TaskItem, TaskFilters, TaskStats
  hooks/           # useFilteredTasks
  __tests__/       # Jest + RTL test files

# Setup
Install dependencies:
Shellnpm installShow more lines
Run development server:
Shellnpm run devShow more lines
Testing
Run all tests:
Shellnpm testShow more lines
Run with coverage:
Shellnpm test -- --coverageShow more lines
# What’s Tested

Adding, toggling, deleting tasks
Clearing completed tasks
Filters (All, Active, Completed)
Stats updates
Hook logic (useFilteredTasks)
