# Mobile App Integration Guide

This guide explains how the React Native mobile app integrates with the Laravel backend API.

## 🚀 Quick Start

### Prerequisites
- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- Laravel backend running on `http://localhost:8000`
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Install Dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Start the Backend**
   ```bash
   cd ../backend
   php artisan serve
   ```

3. **Start the Mobile App**
   ```bash
   cd ../mobile
   npm start
   ```

## 📱 Platform Configuration

### iOS Simulator
The app uses `http://localhost:8000/api` by default. No additional configuration needed.

### Android Emulator
The app automatically uses `http://10.0.2.2:8000/api` (Android's special alias for localhost).

### Physical Device
1. Find your computer's local IP address:
   - Mac/Linux: `ifconfig | grep "inet "`
   - Windows: `ipconfig`

2. Update the API URL in `src/config/api.js`:
   ```javascript
   // Replace with your computer's IP address
   return 'http://192.168.1.XXX:8000/api';
   ```

3. Make sure your phone and computer are on the same WiFi network.

## 🔗 API Integration

### Authentication Flow

1. **SplashScreen** (`src/screens/SplashScreen.js`)
   - Checks for stored authentication token
   - Restores user session if token exists
   - Redirects to Login or Main screen

2. **LoginScreen** (`src/screens/LoginScreen.js`)
   - User enters email and password
   - Calls `/api/login` endpoint
   - Stores token and user data in AsyncStorage
   - Redirects to Main screen

3. **RegisterScreen** (`src/screens/RegisterScreen.js`)
   - User enters name, email, and password
   - Calls `/api/register` endpoint
   - Stores token and user data in AsyncStorage
   - Redirects to Main screen

### Protected Routes

All API calls to protected endpoints automatically include the Bearer token:

```javascript
// Token is automatically added by axios interceptor
Authorization: Bearer {token}
```

### API Services

#### Auth Service (`src/services/authService.js`)
```javascript
// Login
await authService.login(email, password);

// Register
await authService.register(name, email, password);

// Logout
await authService.logout();

// Check authentication
const isAuth = await authService.isAuthenticated();

// Get current user
const userData = await authService.getCurrentUser();
```

#### Person Service (`src/services/personService.js`)
```javascript
// Get recommended people
const people = await personService.getRecommendedPeople(page, perPage);

// Like a person
await personService.likePerson(personId);

// Dislike a person
await personService.dislikePerson(personId);

// Get liked people
const liked = await personService.getLikedPeople(page, perPage);
```

## 🏗️ Project Structure

```
mobile/
├── src/
│   ├── atoms/              # Recoil state atoms
│   │   └── authAtom.js     # Authentication state
│   ├── components/         # Reusable components
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── config/             # Configuration files
│   │   ├── api.js          # Axios instance and interceptors
│   │   └── env.js          # Environment configuration
│   ├── screens/            # Screen components
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── MainScreen.js
│   │   └── LikedListScreen.js
│   └── services/           # API services
│       ├── authService.js
│       └── personService.js
└── App.js                  # Root component
```

## 🔧 Configuration

### API Base URL
The API URL is automatically configured based on the platform:
- **iOS Simulator**: `http://localhost:8000/api`
- **Android Emulator**: `http://10.0.2.2:8000/api`
- **Production**: Set in `src/config/env.js`

### Token Management
- Tokens are stored in AsyncStorage
- Automatically added to all API requests
- Removed on logout or 401 errors

### State Management
- **Recoil** for global state (auth state)
- **React Query** for server state (API data caching)

## 📝 API Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/register` | POST | No | Register new user |
| `/api/login` | POST | No | Login user |
| `/api/logout` | POST | Yes | Logout user |
| `/api/people` | GET | Yes | Get recommended people |
| `/api/people/{id}/like` | POST | Yes | Like a person |
| `/api/people/{id}/dislike` | POST | Yes | Dislike a person |
| `/api/people/liked` | GET | Yes | Get liked people |

## 🐛 Troubleshooting

### Cannot Connect to Backend

**iOS Simulator:**
```bash
# Test connection
curl http://localhost:8000/api/people
```

**Android Emulator:**
```bash
# Test from emulator terminal
adb shell
curl http://10.0.2.2:8000/api/people
```

**Physical Device:**
1. Make sure both devices are on the same WiFi
2. Check firewall settings
3. Update API URL to use local IP address

### CORS Errors
Make sure CORS is properly configured in Laravel backend (`config/cors.php`):
```php
'paths' => ['api/*'],
'allowed_origins' => ['*'],
```

### Token Issues
If authentication fails:
```javascript
// Clear stored data
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.clear();
```

### Network Errors
Check that:
1. Backend server is running (`php artisan serve`)
2. Database is connected
3. API URL is correct for your platform

## 🔐 Security Best Practices

1. **Never commit tokens** to version control
2. **Use HTTPS** in production
3. **Implement refresh tokens** for better security
4. **Validate user input** on both frontend and backend
5. **Use environment variables** for sensitive configuration

## 📚 Additional Resources

- [Laravel Sanctum Docs](https://laravel.com/docs/sanctum)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Query Docs](https://tanstack.com/query/latest)
- [Expo Docs](https://docs.expo.dev/)
- [Recoil Docs](https://recoiljs.org/)

## 🚢 Deployment

### Mobile App
1. Build production app with Expo
2. Submit to App Store / Google Play

### Backend API
1. Deploy Laravel backend to production server
2. Update API URL in `src/config/env.js`
3. Enable HTTPS
4. Configure proper CORS settings

## 💡 Tips

1. **Use React Query DevTools** for debugging API calls
2. **Enable network debugging** in React Native Debugger
3. **Test on both platforms** before deployment
4. **Implement error boundaries** for better error handling
5. **Add loading states** for better UX
