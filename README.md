# QR-Based Attendance System - Phase 1

A modern, location-aware attendance system built with React, Node.js/Express, and Google Sheets.

## 🚀 Features

- **QR Code Generation**: Faculty can create attendance sessions with unique QR codes
- **Location Validation**: GPS-based verification ensures students are physically present
- **Duplicate Prevention**: System prevents multiple attendance entries
- **CSV Export**: Download attendance records for easy record keeping
- **Real-time Updates**: Attendance list updates automatically

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│  Express API    │────▶│  Google Sheets  │
│   (Frontend)    │     │   (Backend)     │     │   (Database)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 📦 Tech Stack

**Frontend:**
- React 18 + Vite
- React Router DOM
- html5-qrcode (Scanner)
- react-qr-code (Display)
- Axios

**Backend:**
- Node.js + Express
- Google Sheets API
- QRCode library
- Geolib (Location validation)
- json2csv

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- Google Cloud account (for Sheets API)

### 1. Clone & Install

```bash
# Backend
cd server
npm install
cp .env.example .env

# Frontend
cd ../client
npm install
```

### 2. Configure Google Sheets

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account
5. Download credentials JSON
6. Create a Google Spreadsheet with two sheets:
   - `Sessions` (columns: sessionId, facultyName, subject, latitude, longitude, radius, createdAt, status)
   - `Attendance` (columns: recordId, sessionId, studentId, studentName, markedAt, latitude, longitude, distance)
7. Share the spreadsheet with your service account email

### 3. Environment Variables

Edit `server/.env`:

```env
PORT=5000
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
DEFAULT_RADIUS_METERS=50
CLIENT_URL=http://localhost:5173
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/create-session` | Create attendance session |
| GET | `/api/session/:id` | Get session details |
| GET | `/api/sessions` | Get all sessions |
| PATCH | `/api/session/:id/close` | Close a session |
| POST | `/api/mark-attendance` | Mark student attendance |
| GET | `/api/attendance/:sessionId` | Get attendance list |
| GET | `/api/export-attendance/:sessionId` | Download CSV |

## 🔐 Phase 2 (Coming Soon)

- JWT Authentication
- OTP Verification for students
- Role-based access (Admin, Faculty, Student)
- MongoDB integration
- Enrollment system
- Analytics dashboard

## 📄 License

MIT

---

Built with ❤️ for C2C Project

