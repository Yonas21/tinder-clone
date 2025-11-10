# Laravel Backend API

## Installation

1. Install dependencies:
```bash
composer install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure database in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tinder_clone_api
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations:
```bash
php artisan migrate
```

6. Seed sample data (optional):
```bash
php artisan db:seed
```

7. Start the server:
```bash
php artisan serve
```

## API Documentation

Swagger documentation is available at: `http://localhost:8000/api/documentation`

## Cronjob Setup

Add this to your crontab:
```bash
* * * * * cd /path-to-project/backend && php artisan schedule:run >> /dev/null 2>&1
```

Or use Laravel's task scheduler by running:
```bash
php artisan schedule:work
```

