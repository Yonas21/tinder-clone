# Tinder Clone - Full Stack Application

A complete Tinder-like dating application with Laravel backend API and React Native mobile app.

## Project Structure

This project consists of two main components:

1. **Backend** (`/backend/`) - Laravel REST API with Swagger documentation
2. **Mobile** (`/mobile/`) - React Native mobile application

## Quick Start

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure database in .env
php artisan migrate
php artisan l5-swagger:generate
php artisan serve
```

### Mobile Setup

```bash
cd mobile
npm install
# Update API URL in src/config/api.js
npm start
```

## Documentation

For detailed documentation, see:
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Complete project overview
- [backend/README.md](./backend/README.md) - Backend API documentation
- [mobile/README.md](./mobile/README.md) - Mobile app documentation

## Features

### Backend (Laravel)
- RESTful API with authentication
- Swagger/OpenAPI documentation
- Pagination support
- Cronjob for popular people notifications
- Database migrations and seeders

### Mobile (React Native)
- Atomic design architecture
- Tinder-like swipe cards
- React Query for data fetching
- Recoil for state management
- Splash screen
- Liked people list

## API Documentation

Once the backend is running, access Swagger UI at:
```
http://localhost:8000/api/documentation
```

## Technology Stack

- **Backend**: PHP 8.1+, Laravel 10, MySQL, Laravel Sanctum
- **Mobile**: React Native, Expo, React Query, Recoil
- **API Docs**: L5-Swagger (OpenAPI)
