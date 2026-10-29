# Klantenhulpportaal

A customer help portal where users submit support tickets and admins follow them up.

Built at Script as a training project: I followed their courses to practise their tech stack, Laravel with Vue and TypeScript. It is a learning project, not a production system.

## Features

- Register, log in and reset a password (Laravel Sanctum, email notifications)
- Create tickets with a priority and one or more categories
- Comments and notes on tickets
- User and admin roles, with user management for admins

## Tech stack

PHP 8.3 / Laravel 13, Laravel Sanctum, Vue 3, TypeScript, Vue Router, Tailwind CSS 4, Vite, SQLite

## Getting started

Requires PHP 8.3+, Composer and Node.js.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
composer dev
```

Seeded accounts (password `password`): `admin@example.com` and `test@example.com`.

## Diagrams

- [Database model](DatabaseModelDiagram.png)
- [Flowchart: creating a ticket](Flowchart%20creating%20a%20ticket.png)
