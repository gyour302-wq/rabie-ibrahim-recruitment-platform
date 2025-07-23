# Rabie Ibrahim Recruitment - Professional Recruitment Platform

A **production-ready, bilingual recruitment application** built for Rabie Ibrahim Company for Egyptian Manpower Recruitment Abroad.

## 🌟 Features

### ✅ **Complete Bilingual Support**
- **Arabic & English** with full RTL support
- **Dynamic language switching** with persistent preferences
- **Professional translations** ready for customization

### ✅ **Cross-Platform Application**
- **React Native + Expo** for iOS, Android, and Web
- **Responsive design** for all screen sizes
- **Modern UI/UX** with professional branding

### ✅ **Full-Stack Architecture**
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React Native + Expo + React Native Web
- **File Upload**: CV (PDF/DOC) and Video (MP4) support

### ✅ **Core Features**
- **Splash Screen** with company branding
- **Bottom Tab Navigation** with 5 sections:
  - Jobs (with modern card design)
  - Candidates (with video preview)
  - Visa Services (with forms)
  - About Us (company info)
  - Contact Us (with forms)

### ✅ **Advanced Features**
- **Apply Now Modal** with file upload
- **Admin Dashboard** (protected routes)
- **Form validation** and error handling
- **Real-time language switching**
- **Responsive design** for mobile and web

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- Expo CLI

### Installation

#### Backend Setup
```bash
cd backend
npm install
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📱 Live Demo

### Local Development
1. **Backend**: `http://localhost:5000`
2. **Frontend**: `http://localhost:19006`

### Deployment Options
- **Expo Web**: `npm run web`
- **Vercel**: `vercel --prod`
- **Netlify**: Deploy web-build folder
- **Firebase**: `firebase deploy`

## 🌍 Language Support

### Translation Files
- **English**: `frontend/src/locales/en.json`
- **Arabic**: `frontend/src/locales/ar.json`

### RTL Support
- **Dynamic layout switching** based on language
- **Proper text alignment** for Arabic
- **Navigation direction** changes automatically

## 🎨 Customization

### Company Branding
- **Logo**: Replace placeholder in SplashScreen
- **Colors**: Update in `frontend/src/utils/constants.js`
- **Content**: Update translation files

### Real Data Integration
- **API Endpoints**: Update in `frontend/src/utils/apiService.js`
- **Backend URL**: Configure in environment variables

## 📋 API Endpoints

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job (admin)
- `POST /api/jobs/apply` - Submit application

### Candidates
- `GET /api/candidates` - List all candidates
- `POST /api/candidates` - Create candidate profile

### Visa Services
- `GET /api/visa-requests` - List visa requests
- `POST /api/visa-requests` - Submit visa request

### Contact
- `POST /api/contact` - Submit contact form

### Admin
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Dashboard data

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload
- **CORS** - Cross-origin support

### Frontend
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation
- **i18n-js** - Internationalization
- **Expo DocumentPicker** - File upload
- **AsyncStorage** - Local storage

## 🎯 Ready for Production

### ✅ Completed Features
- [x] Bilingual support (Arabic/English)
- [x] RTL layout for Arabic
- [x] Modern UI/UX design
- [x] File upload functionality
- [x] Form validation
- [x] Responsive design
- [x] Admin dashboard structure
- [x] Cross-platform compatibility

### 🔄 Next Steps
1. **Add company logo** to SplashScreen
2. **Replace sample data** with real content
3. **Update translations** as needed
4. **Deploy** to preferred hosting platform

## 📞 Support
For technical support or customization requests, please refer to the deployment guide in `DEPLOYMENT.md`.

## 🚀 Deployment Ready
The application is **production-ready** and can be deployed immediately using any of the provided methods!

**Start your recruitment platform today!**
