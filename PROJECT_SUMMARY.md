# Tinder Clone Project - Complete Implementation

## Overview

This project consists of two main components:
1. **Laravel Backend API** - RESTful API with Swagger documentation
2. **React Native Mobile App** - Cross-platform mobile application

## Backend (Laravel)

### Location
`/backend/`

### Features Implemented

1. **Database Schema**
   - `people` table - Stores person information (name, age, location, coordinates)
   - `pictures` table - Stores person photos with primary photo flag
   - `likes` table - Tracks like/dislike actions
   - `users` table - User authentication
   - `notification_sent` table - Tracks email notifications

2. **API Endpoints**
   - `GET /api/people` - Get recommended people list (with pagination)
   - `POST /api/people/{id}/like` - Like a person
   - `POST /api/people/{id}/dislike` - Dislike a person
   - `GET /api/people/liked` - Get liked people list (with pagination)
   - `POST /api/register` - User registration
   - `POST /api/login` - User login
   - `POST /api/logout` - User logout

3. **Cronjob**
   - Command: `people:check-popular`
   - Runs hourly via Laravel scheduler
   - Checks for people with 50+ likes
   - Sends email to admin when threshold is reached
   - Prevents duplicate notifications

4. **Swagger Documentation**
   - Available at: `http://localhost:8000/api/documentation`
   - All endpoints documented with OpenAPI annotations
   - Testable directly from Swagger UI

### Setup Instructions

1. Install dependencies:
```bash
cd backend
composer install
```

2. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Update `.env` with database credentials

4. Run migrations:
```bash
php artisan migrate
```

5. Seed sample data (optional):
```bash
php artisan db:seed
```

6. Generate Swagger docs:
```bash
php artisan l5-swagger:generate
```

7. Start server:
```bash
php artisan serve
```

8. Setup cronjob:
```bash
# Add to crontab
* * * * * cd /path-to-project/backend && php artisan schedule:run >> /dev/null 2>&1
```

## Mobile App (React Native)

### Location
`/mobile/`

### Features Implemented

1. **Atomic Design Structure**
   - **Atoms**: Card, Button
   - **Molecules**: SwipeCard, ActionButtons
   - **Organisms**: PersonCardStack
   - **Screens**: SplashScreen, LoginScreen, MainScreen, LikedListScreen

2. **State Management**
   - **Recoil**: For authentication state
   - **React Query**: For data fetching and caching

3. **Features**
   - Splash screen on app launch
   - Tinder-like swipe cards
   - Swipe right to like, left to dislike
   - Liked people list (same card design, no swipe actions)
   - Authentication (login/register)
   - API integration with backend

### Setup Instructions

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Configure API URL in `src/config/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

3. Start development server:
```bash
npm start
```

4. Run on device:
```bash
# iOS
npm run ios

# Android
npm run android
```

## API Documentation

### Base URL
`http://localhost:8000/api`

### Authentication
All protected endpoints require Bearer token in Authorization header:
```
Authorization: Bearer {token}
```

### Endpoints

#### Get Recommended People
```
GET /api/people?page=1&per_page=10
```

#### Like Person
```
POST /api/people/{id}/like
```

#### Dislike Person
```
POST /api/people/{id}/dislike
```

#### Get Liked People
```
GET /api/people/liked?page=1&per_page=10
```

## Database Schema

### People Table
- id (primary key)
- name
- age
- location
- latitude
- longitude
- timestamps

### Pictures Table
- id (primary key)
- person_id (foreign key)
- url
- is_primary (boolean)
- order
- timestamps

### Likes Table
- id (primary key)
- user_id (foreign key)
- person_id (foreign key)
- action (enum: like, dislike)
- timestamps
- unique constraint on (user_id, person_id)

## Cronjob Details

The cronjob checks every hour for people who have received 50 or more likes. When found:
1. Sends email to admin (configured in `.env` as `MAIL_ADMIN_EMAIL`)
2. Records notification in `notification_sent` table
3. Prevents duplicate notifications for the same like count

To test manually:
```bash
php artisan people:check-popular
```

## Technology Stack

### Backend
- PHP 8.1+
- Laravel 10
- MySQL/MariaDB
- Laravel Sanctum (Authentication)
- L5-Swagger (API Documentation)

### Mobile
- React Native
- Expo
- React Navigation
- React Query
- Recoil
- Axios

## Project Structure

```
Tinder Clone/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Console/
│   │   │   └── Commands/
│   │   │       └── CheckPopularPeople.php
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           ├── AuthController.php
│   │   │           └── PersonController.php
│   │   └── Models/
│   │       ├── Person.php
│   │       ├── Picture.php
│   │       ├── Like.php
│   │       └── NotificationSent.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
├── mobile/                  # React Native App
│   ├── src/
│   │   ├── atoms/          # Recoil state
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── screens/
│   │   ├── services/
│   │   └── config/
│   └── App.js
└── PROJECT_SUMMARY.md
```

## Testing

### Backend API Testing
1. Access Swagger UI: `http://localhost:8000/api/documentation`
2. Register a new user
3. Login to get access token
4. Use token to test protected endpoints

### Mobile App Testing
1. Start backend server
2. Update API URL in mobile config
3. Run mobile app
4. Test swipe functionality
5. Verify liked list displays correctly

## Notes

- Backend uses Laravel Sanctum for API authentication
- Mobile app stores auth token in AsyncStorage
- All API endpoints are paginated
- Swagger documentation is auto-generated from code annotations
- Cronjob runs via Laravel's task scheduler

