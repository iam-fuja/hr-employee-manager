# HR Employee Manager

Mobile app for the HR & Payroll Platform MVP, built with Expo and React Native. It serves two kinds of users: HR admins (Ada) and employees (Tunde).

## Tech stack

- Expo SDK 54 with Expo Router (file-based routing)
- React Native + TypeScript
- Zustand for state management
- AsyncStorage for local persistence

## Getting started

Prerequisites: Node.js (LTS), npm, and the Expo Go app on your phone or an Android/iOS emulator.

```bash
git clone https://github.com/iam-fuja/hr-employee-manager.git
cd hr-employee-manager
git checkout dev
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) / `i` (iOS) in the terminal.

## Project structure

```
app/          Screens and routes (Expo Router)
components/   Reusable UI components
constants/    Theme and shared constants
hooks/        Custom hooks
store/        Zustand stores (e.g. loginStore)
styles/       Shared styles
assets/       Images and fonts
```

## Branching workflow

- `main`: stable code only. Protected; changes arrive only through a pull request from `dev`.
- `dev`: the working branch. Everyone commits here.

Before you start work and before every push:

```bash
git checkout dev
git pull --rebase
```

Rules:

1. Never push directly to `main`.
2. Pull before you push, and push small commits often.
3. Stage files by name (`git add <file>`), not `git add .`, so nothing unintended gets committed.
4. Do not commit secrets or `.env` files.

## Commit messages

Use a short prefix: `feat:` new feature, `fix:` bug fix, `chore:` tooling or dependencies, `docs:` documentation, `style:` formatting only.

Example: `feat: add login screen UI`

## Releasing to main

When `dev` is stable, open a pull request from `dev` to `main`, get one approval, and merge.
