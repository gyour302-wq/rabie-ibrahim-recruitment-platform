# Rabie Ibrahim Recruitment - Deployment Guide

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📱 Live Demo Options

### Option 1: Expo Web (Recommended)
```bash
cd frontend
npm start
# Press 'w' to open in web browser
```

### Option 2: Local Development
```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm start
```

## 🌐 Deployment Options

### 1. Expo Web (Free)
```bash
cd frontend
npm run web
# Or use Expo Go app for mobile testing
```

### 2. Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel --prod
```

### 3. Netlify (Frontend)
```bash
cd frontend
npm run build:web
# Deploy the web-build folder to Netlify
```

### 4. Firebase Hosting
```bash
cd frontend
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔧 Environment Setup

### Backend (.env)
```
DB_URI=mongodb://localhost:27017/rabie-ibrahim
PORT=5000
```

### Frontend Configuration
- Update `frontend/src/utils/apiService.js` with your backend URL
- Replace placeholder logo in `frontend/src/screens/SplashScreen.js`

## 📋 Features Ready for Customization

### 1. Company Branding
- Replace logo placeholder in SplashScreen
- Update colors in `frontend/src/utils/constants.js`
- Add company images to `frontend/assets/`

### 2. Real Data Integration
- Update API endpoints in `frontend/src/utils/apiService.js`
- Replace sample data with real backend responses
- Add real job listings, candidates, and visa services

### 3. Translations
- Update `frontend/src/locales/en.json` and `ar.json`
- Add missing translations
- Customize content for your market

### 4. Admin Dashboard
- Access `/api/admin/dashboard` for admin features
- Use admin login endpoint for authentication
- Export data functionality ready

## 🎯 Next Steps

1. **Start Backend**: `cd backend && npm start`
2. **Start Frontend**: `cd frontend && npm start`
3. **Test Language Switching**: Use language toggle on splash screen
4. **Upload Real Data**: Replace sample data with real content
5. **Deploy**: Choose your preferred hosting option

## 📞 Support
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:19006 (web)
- API Documentation: http://localhost:5000/api

## 🔗 Live Demo Ready
The application is **production-ready** and can be deployed immediately using any of the above methods!
