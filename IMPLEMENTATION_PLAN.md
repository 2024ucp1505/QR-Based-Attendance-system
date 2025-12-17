# QR-Based Attendance System - Phase 1 Implementation Plan

## 📋 Project Overview

A QR-based attendance system built with **React**, **Node.js/Express**, and **Google Sheets** as the data store. Phase 1 establishes a working base model with extensibility for Phase 2 (authentication, roles, MongoDB).

---

## 🏗️ Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Faculty View │  │ Student View │  │ Attendance Dashboard │   │
│  │ (QR Generate)│  │ (QR Scanner) │  │    (CSV Export)      │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js + Express)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  QR Session  │  │   Location   │  │     Attendance       │   │
│  │    Module    │  │  Validation  │  │       Module         │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Storage Abstraction Layer                      │   │
│  │   (Replaceable with MongoDB in Phase 2)                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Google Sheets (Database)                      │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐   │
│  │ Sessions Sheet  │  │        Attendance Sheet             │   │
│  └─────────────────┘  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Proposed Project Structure

```
c2cProject/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Faculty/
│   │   │   │   ├── CreateSession.jsx
│   │   │   │   └── QRCodeDisplay.jsx
│   │   │   ├── Student/
│   │   │   │   ├── QRScanner.jsx
│   │   │   │   └── AttendanceConfirmation.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── AttendanceList.jsx
│   │   │   │   └── ExportButton.jsx
│   │   │   └── common/
│   │   │       ├── Header.jsx
│   │   │       ├── LocationPrompt.jsx
│   │   │       └── Loading.jsx
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── hooks/
│   │   │   ├── useGeolocation.js
│   │   │   └── useQRScanner.js
│   │   ├── utils/
│   │   │   └── locationUtils.js
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── sessionController.js
│   │   │   ├── attendanceController.js
│   │   │   └── exportController.js
│   │   ├── services/
│   │   │   ├── qrService.js
│   │   │   ├── locationService.js
│   │   │   └── attendanceService.js
│   │   ├── storage/                 # Storage Abstraction Layer
│   │   │   ├── index.js             # Storage interface
│   │   │   ├── googleSheetsStorage.js
│   │   │   └── mongoStorage.js      # Placeholder for Phase 2
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── authMiddleware.js    # Placeholder for Phase 2
│   │   ├── routes/
│   │   │   ├── sessionRoutes.js
│   │   │   ├── attendanceRoutes.js
│   │   │   └── exportRoutes.js
│   │   ├── utils/
│   │   │   ├── qrGenerator.js
│   │   │   └── csvGenerator.js
│   │   ├── config/
│   │   │   └── googleSheets.js
│   │   └── app.js
│   ├── package.json
│   └── .env.example
│
├── docs/                            # Documentation
│   ├── Phase1_QR_Attendance_SRS.pdf
│   ├── Phase1_QR_Attendance_SDS.pdf
│   └── Phase1_QR_Attendance_API_Documentation.pdf
│
├── IMPLEMENTATION_PLAN.md
└── README.md
```

---

## 🔌 API Endpoints (Phase 1)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/create-session` | Create new attendance session | `{ facultyName, subject, location: {lat, lng, radius} }` | `{ sessionId, qrCode }` |
| `POST` | `/api/mark-attendance` | Mark student attendance | `{ sessionId, studentId, studentName, location: {lat, lng} }` | `{ success, message }` |
| `GET` | `/api/export-attendance/:sessionId` | Export attendance as CSV | - | CSV file download |
| `GET` | `/api/session/:sessionId` | Get session details | - | `{ session }` |
| `GET` | `/api/attendance/:sessionId` | Get attendance list | - | `{ attendance: [] }` |

---

## ✅ Functional Requirements Mapping

| ID | Requirement | Implementation |
|----|-------------|----------------|
| **FR1** | Create attendance sessions | `POST /api/create-session` - Generates unique sessionId, stores in Google Sheets |
| **FR2** | Generate QR code for each session | QR contains sessionId + location data, displayed to faculty |
| **FR3** | Validate student location | Compare student GPS with session location within radius |
| **FR4** | Store attendance with timestamp | Auto-timestamp on successful attendance mark |
| **FR5** | Prevent duplicate attendance | Check existing records before insertion |

---

## 📦 Technology Stack & Dependencies

### Frontend (React + Vite)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "html5-qrcode": "^2.x",
    "react-qr-code": "^2.x"
  }
}
```

### Backend (Node.js + Express)
```json
{
  "dependencies": {
    "express": "^4.x",
    "cors": "^2.x",
    "dotenv": "^16.x",
    "uuid": "^9.x",
    "qrcode": "^1.x",
    "googleapis": "^126.x",
    "json2csv": "^6.x",
    "geolib": "^3.x"
  }
}
```

---

## 🚀 Implementation Phases

### **Step 1: Project Setup** (Day 1)
- [ ] Initialize monorepo structure
- [ ] Setup React frontend with Vite
- [ ] Setup Node.js/Express backend
- [ ] Configure ESLint & Prettier
- [ ] Setup environment variables

### **Step 2: Google Sheets Integration** (Day 2)
- [ ] Create Google Cloud project
- [ ] Enable Google Sheets API
- [ ] Setup service account credentials
- [ ] Create spreadsheet with Sessions & Attendance sheets
- [ ] Implement storage abstraction layer
- [ ] Test CRUD operations with Google Sheets

### **Step 3: Backend API Development** (Day 3-4)
- [ ] Implement `POST /create-session`
  - Generate unique sessionId (UUID)
  - Store session with location parameters
  - Return sessionId
- [ ] Implement `POST /mark-attendance`
  - Validate session exists
  - Validate location (within radius)
  - Check for duplicate attendance
  - Store attendance with timestamp
- [ ] Implement `GET /export-attendance/:sessionId`
  - Fetch attendance records
  - Generate CSV file
  - Return downloadable file
- [ ] Implement supporting endpoints (get session, get attendance list)

### **Step 4: QR Code Module** (Day 4)
- [ ] Implement QR code generation service
- [ ] QR code contains: sessionId, location data, timestamp
- [ ] Setup QR code API endpoint

### **Step 5: Frontend - Faculty View** (Day 5-6)
- [ ] Create session form (subject, location settings)
- [ ] Display generated QR code
- [ ] Session management dashboard
- [ ] View attendance list for session
- [ ] Export to CSV button

### **Step 6: Frontend - Student View** (Day 6-7)
- [ ] QR code scanner component
- [ ] Geolocation permission & capture
- [ ] Student info input form
- [ ] Attendance confirmation screen
- [ ] Error handling (location mismatch, duplicate, etc.)

### **Step 7: Location Validation** (Day 7)
- [ ] Implement Haversine formula for distance calculation
- [ ] Configure validation radius (default: 50m)
- [ ] Handle GPS accuracy issues
- [ ] Location permission handling on frontend

### **Step 8: Testing & Polish** (Day 8)
- [ ] End-to-end testing
- [ ] Error handling improvements
- [ ] Loading states & UX polish
- [ ] Mobile responsiveness
- [ ] Documentation

---

## 🔒 Phase 2 Preparation Notes

The following design decisions ensure smooth Phase 2 migration:

1. **Storage Abstraction Layer**
   - All data operations go through abstraction
   - Easy swap from Google Sheets to MongoDB
   
2. **SessionId Pattern**
   - UUID-based sessionId acts as entity reference
   - Ready for Session model in database

3. **Middleware-Ready Architecture**
   - Auth middleware placeholder exists
   - Route structure supports middleware injection

4. **No Authentication Assumptions**
   - Phase 1 works without auth
   - Phase 2 adds JWT/OTP authentication

---

## 📊 Google Sheets Schema

### Sessions Sheet
| Column | Type | Description |
|--------|------|-------------|
| sessionId | String (UUID) | Unique session identifier |
| facultyName | String | Name of faculty creating session |
| subject | String | Subject/class name |
| latitude | Number | Session location latitude |
| longitude | Number | Session location longitude |
| radius | Number | Allowed radius in meters |
| createdAt | DateTime | Session creation timestamp |
| status | String | active/closed |

### Attendance Sheet
| Column | Type | Description |
|--------|------|-------------|
| recordId | String (UUID) | Unique attendance record |
| sessionId | String | Reference to session |
| studentId | String | Student identifier |
| studentName | String | Student name |
| markedAt | DateTime | Attendance timestamp |
| latitude | Number | Student location latitude |
| longitude | Number | Student location longitude |
| distance | Number | Distance from session location |

---

## ⚠️ Key Considerations

1. **Location Accuracy**: Mobile GPS can be inaccurate; consider 50-100m radius
2. **QR Code Expiry**: Consider session timeout for security
3. **Concurrent Access**: Google Sheets API rate limits (100 requests/100 seconds)
4. **Error Messages**: Clear user feedback for location/duplicate errors
5. **Mobile-First**: Students will primarily use mobile devices

---

## 🎯 Phase 2 Preview (Future Scope)

- **Authentication**: JWT-based auth with OTP verification
- **Role Management**: Admin, Faculty, Student roles
- **MongoDB Migration**: Replace Google Sheets storage
- **Enrollment System**: Student-course enrollment
- **Analytics Dashboard**: Attendance reports & statistics
- **Session Scheduling**: Pre-scheduled sessions

---

## 📝 Getting Started Commands

```bash
# After project setup:

# Backend
cd server
npm install
cp .env.example .env
# Add Google Sheets credentials
npm run dev

# Frontend  
cd client
npm install
npm run dev
```

---

*Document Created: December 17, 2025*
*Phase 1 Estimated Duration: 8-10 days*

