# Tinder Clone - React Native Mobile App

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure API URL in `src/config/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

3. Start the development server:
```bash
npm start
```

## Project Structure (Atomic Design)

```
src/
├── atoms/              # Basic building blocks
│   ├── Card.js
│   └── Button.js
├── molecules/          # Simple component groups
│   ├── SwipeCard.js
│   └── ActionButtons.js
├── organisms/          # Complex components
│   └── PersonCardStack.js
├── screens/            # Full screen components
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── MainScreen.js
│   └── LikedListScreen.js
├── services/           # API services
│   ├── authService.js
│   └── personService.js
├── config/            # Configuration
│   └── api.js
└── atoms/             # Recoil state
    └── authAtom.js
```

## Features

- **Splash Screen**: Shows on app launch
- **Swipe Cards**: Tinder-like swipe functionality
- **Like/Dislike**: Swipe right to like, left to dislike
- **Liked List**: View all liked people
- **React Query**: For data fetching and caching
- **Recoil**: For state management
- **Atomic Design**: Organized component structure

## Running on Device

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Dependencies

- React Native
- Expo
- React Navigation
- React Query
- Recoil
- Axios
- React Native Gesture Handler
- React Native Reanimated

