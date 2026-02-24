# Tripnix - Travel & Tour Booking Platform (Backend)

A robust RESTful API backend for the Tripnix travel and tour booking platform. Built with Node.js, Express, TypeScript, and MongoDB, featuring secure authentication, payment integration, and comprehensive tour management.

## 🚀 Features

### Core Features

- **User Management** - Registration, authentication, and profile management
- **Tour Management** - CRUD operations for tours with image uploads
- **Booking System** - Complete booking workflow with status tracking
- **Payment Integration** - SSLCommerz payment gateway integration
- **Division Management** - Geographical categorization of tours
- **Statistics & Analytics** - Dashboard stats for admin users

### Security Features

- **JWT Authentication** - Access & refresh token mechanism
- **OAuth 2.0** - Google social login integration
- **OTP Verification** - Email-based OTP for account verification
- **Role-Based Access Control** - Super Admin, Admin, User, Guide roles
- **Password Management** - Reset, change, and forget password flows

### Technical Features

- **Redis Caching** - Session and data caching
- **Cloudinary Integration** - Image upload and storage
- **Email Service** - Nodemailer with EJS templates
- **PDF Generation** - Invoice generation with PDFKit
- **Query Builder** - Advanced filtering, searching, sorting, and pagination
- **Global Error Handling** - Centralized error management
- **Request Validation** - Zod schema validation

## 🛠️ Tech Stack

| Category           | Technologies          |
| ------------------ | --------------------- |
| **Runtime**        | Node.js               |
| **Framework**      | Express 5             |
| **Language**       | TypeScript            |
| **Database**       | MongoDB with Mongoose |
| **Caching**        | Redis                 |
| **Authentication** | JWT, Passport.js      |
| **Validation**     | Zod                   |
| **File Upload**    | Multer, Cloudinary    |
| **Email**          | Nodemailer, EJS       |
| **Payment**        | SSLCommerz            |
| **PDF**            | PDFKit                |
| **Deployment**     | Vercel                |

## 📋 Prerequisites

- **Node.js** - v18.0.0 or higher
- **MongoDB** - v6.0 or higher (local or MongoDB Atlas)
- **Redis** - v7.0 or higher (local or cloud)
- **Cloudinary Account** - For image storage
- **SSLCommerz Account** - For payment processing (sandbox for development)

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AH-Ratul/tripnix_server.git
   cd tripnix_server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:5000`

## 📁 Project Structure

```
src/
├── app/
│   ├── config/              # Configuration files
│   │   ├── index.ts         # Environment config loader
│   │   ├── cloudinary.config.ts
│   │   ├── multer.config.ts
│   │   ├── passport.ts      # Google OAuth config
│   │   └── redis.config.ts
│   ├── errorHelpers/        # Error handling utilities
│   │   ├── AppError.ts      # Custom error class
│   │   └── helpers/         # Error type handlers
│   ├── interfaces/          # TypeScript interfaces
│   ├── middlewares/
│   │   ├── checkAuth.ts     # Authentication middleware
│   │   ├── globalErrorHandler.ts
│   │   ├── notFound.ts
│   │   └── validateRequest.ts
│   ├── modules/
│   │   ├── auth/            # Authentication module
│   │   ├── booking/         # Booking management
│   │   ├── division/        # Division/location management
│   │   ├── otp/             # OTP verification
│   │   ├── payment/         # Payment processing
│   │   ├── sslCommerz/      # SSLCommerz integration
│   │   ├── stats/           # Analytics & statistics
│   │   ├── tour/            # Tour management
│   │   └── user/            # User management
│   ├── routes/              # API route aggregator
│   └── utils/               # Utility functions
│       ├── catchAsync.ts    # Async error wrapper
│       ├── jwt.ts           # JWT utilities
│       ├── queryBuilder.ts  # MongoDB query builder
│       ├── seedSuperAdmin.ts
│       ├── sendEmail.ts     # Email service
│       ├── sendResponse.ts  # Response formatter
│       └── templates/       # Email templates
├── app.ts                   # Express app setup
└── server.ts                # Server entry point
```

## 🗺️ API Endpoints

### Authentication (`/api/v1/auth`)

| Method | Endpoint           | Description                | Auth |
| ------ | ------------------ | -------------------------- | ---- |
| POST   | `/login`           | User login                 | No   |
| POST   | `/logout`          | User logout                | No   |
| POST   | `/refresh-token`   | Get new access token       | No   |
| POST   | `/reset-password`  | Reset password             | Yes  |
| POST   | `/change-password` | Change password            | Yes  |
| POST   | `/set-password`    | Set password (OAuth users) | Yes  |
| POST   | `/forget-password` | Forget password flow       | No   |
| GET    | `/google`          | Google OAuth login         | No   |
| GET    | `/google/callback` | Google OAuth callback      | No   |

### User (`/api/v1/user`)

| Method | Endpoint     | Description       | Auth  |
| ------ | ------------ | ----------------- | ----- |
| POST   | `/register`  | Register new user | No    |
| GET    | `/me`        | Get current user  | Yes   |
| GET    | `/all-users` | Get all users     | Admin |
| GET    | `/:id`       | Get single user   | Admin |
| PATCH  | `/:id`       | Update user       | Yes   |

### OTP (`/api/v1/otp`)

| Method | Endpoint  | Description       | Auth |
| ------ | --------- | ----------------- | ---- |
| POST   | `/send`   | Send OTP to email | No   |
| POST   | `/verify` | Verify OTP        | No   |

### Tour (`/api/v1/tour`)

| Method | Endpoint            | Description        | Auth  |
| ------ | ------------------- | ------------------ | ----- |
| GET    | `/`                 | Get all tours      | No    |
| GET    | `/:id`              | Get single tour    | No    |
| POST   | `/create`           | Create tour        | Admin |
| PATCH  | `/:id`              | Update tour        | Admin |
| DELETE | `/:id`              | Delete tour        | Admin |
| GET    | `/tour-types`       | Get all tour types | No    |
| POST   | `/create-tour-type` | Create tour type   | Admin |
| PATCH  | `/tour-types/:id`   | Update tour type   | Admin |
| DELETE | `/tour-types/:id`   | Delete tour type   | Admin |

### Division (`/api/v1/division`)

| Method | Endpoint  | Description         | Auth  |
| ------ | --------- | ------------------- | ----- |
| GET    | `/`       | Get all divisions   | No    |
| GET    | `/:slug`  | Get single division | No    |
| POST   | `/create` | Create division     | Admin |
| PATCH  | `/:id`    | Update division     | Admin |
| DELETE | `/:id`    | Delete division     | Admin |

### Booking (`/api/v1/booking`)

| Method | Endpoint             | Description           | Auth  |
| ------ | -------------------- | --------------------- | ----- |
| GET    | `/`                  | Get all bookings      | Admin |
| GET    | `/my-bookings`       | Get user's bookings   | Yes   |
| GET    | `/:bookingId`        | Get single booking    | Yes   |
| POST   | `/`                  | Create booking        | Yes   |
| PATCH  | `/:bookingId/status` | Update booking status | Yes   |

### Payment (`/api/v1/payment`)

| Method | Endpoint                   | Description              | Auth |
| ------ | -------------------------- | ------------------------ | ---- |
| GET    | `/:id`                     | Get payment details      | Yes  |
| POST   | `/init-payment/:bookingId` | Initialize payment       | No   |
| POST   | `/success`                 | Payment success callback | No   |
| POST   | `/fail`                    | Payment failure callback | No   |
| POST   | `/cancel`                  | Payment cancel callback  | No   |
| POST   | `/validate-payment`        | Validate payment (IPN)   | No   |
| GET    | `/invoice/:paymentId`      | Get invoice URL          | Yes  |

### Statistics (`/api/v1/stats`)

| Method | Endpoint   | Description        | Auth  |
| ------ | ---------- | ------------------ | ----- |
| GET    | `/booking` | Booking statistics | Admin |
| GET    | `/payment` | Payment statistics | Admin |
| GET    | `/user`    | User statistics    | Admin |
| GET    | `/tour`    | Tour statistics    | Admin |

## 📜 Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot-reload |
| `npm run build` | Build TypeScript to JavaScript           |
| `npm start`     | Start production server                  |
| `npm run lint`  | Run ESLint                               |

## 🔐 Authentication Flow

### Credentials Authentication

1. User registers with email/password
2. OTP sent to email for verification
3. User verifies OTP to activate account
4. Login returns access token (cookie) + refresh token
5. Access token used for authenticated requests
6. Refresh token used to get new access token

### Google OAuth

1. User clicks Google login
2. Redirected to Google consent screen
3. Google callback creates/updates user
4. JWT tokens issued same as credentials flow

## 🏗️ Module Structure

Each module follows a consistent pattern:

```
module/
├── module.controller.ts  # Request handlers
├── module.interface.ts   # TypeScript interfaces
├── module.model.ts       # Mongoose schema/model
├── module.route.ts       # Express routes
├── module.service.ts     # Business logic
└── module.validation.ts  # Zod schemas
```

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI

   ```bash
   npm i -g vercel
   ```

2. Build the project

   ```bash
   npm run build
   ```

3. Deploy
   ```bash
   vercel --prod
   ```

The `vercel.json` is pre-configured for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- **AH-Ratul** - [GitHub](https://github.com/AH-Ratul)

---

**Tripnix API** - Powering travel experiences! 🌍
