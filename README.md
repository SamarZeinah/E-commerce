# 🛍️ E-Commerce Store

A modern E-Commerce web application built using Next.js App Router, TypeScript, Tailwind CSS, and Context API.  
The application provides a complete shopping experience including authentication, cart management, wishlist handling, product filtering, order history, and profile management.

---

# 🚀 Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Formik
- Yup
- JWT Decode
- React Hot Toast
- Swiper.js
- Shadcn/UI

---

# 📂 Project Structure

```bash
src/
│
├── app/
│   ├── Authentication/
│   ├── Store/
│   ├── layout.tsx
│   └── LayoutContent.tsx
│
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── WishlistContext.tsx
│
├── lib/
│   └── axios.ts
│
├── components/
│
└── styles/
```

---

# 🔐 Authentication System

The application supports:

- Register
- Login
- Logout
- Forgot Password
- Verify Reset Code
- Reset Password

Authentication token and user data are stored in localStorage.

---

# 🔄 Reset Password Flow

## 1️⃣ Forgot Password

The user enters their email address.

### API

```bash
POST /auth/forgotPasswords
```

A verification code is sent to the user's email.

---

## 2️⃣ Verify Reset Code

The user enters the verification code.

### API

```bash
POST /auth/verifyResetCode
```

After successful verification:

- resetCode is stored in localStorage
- User is redirected to:

```bash
/Authentication/reset-password
```

---

## 3️⃣ Reset Password

The user enters:

- Email
- New Password

### API

```bash
PUT /auth/resetPassword
```

### Payload

```json
{
  "email": "user@example.com",
  "newPassword": "123456",
  "code": "123456"
}
```

After success:

- Token is stored
- User data is stored
- Redirect to home page

---

# 🛒 Cart System

## Features

- Add product to cart
- Increase/decrease quantity
- Refresh cart count
- Reset cart

### Context

```ts
CartContext
```

Cart data is synced with API using Axios.

---

# ❤️ Wishlist System

## Features

- Add to wishlist
- Remove from wishlist
- Fetch wishlist products

### Context

```ts
WishlistContext
```

Wishlist IDs are also stored locally for faster UI updates.

---

# 🛍️ Products Page

## Features

- Product listing
- Category filtering
- Brand filtering
- Add to cart
- Add/remove wishlist

### Filtering Examples

```bash
/products?brand=...
```

```bash
/products?category[in]=...
```

---

# 📦 Orders Page

The application fetches user orders using decoded JWT token.

### API

```bash
GET /orders/user/{userId}
```

## Features

- Order cards
- Expandable order details
- Product summary

---

# 👤 Profile Page

Contains two main sections:

- Addresses
- Settings

---

## 📍 Addresses

### Features

- Add address
- Edit address
- Delete address

### APIs

```bash
GET /addresses
POST /addresses
PUT /addresses/:id
DELETE /addresses/:id
```

### Components

```ts
AddressModal
```

---

## ⚙️ Settings

Contains:

- Profile Information Form
- Change Password Form

---

# 🌐 Axios Configuration

Centralized Axios instance:

```ts
baseURL = https://ecommerce.routemisr.com/api/v1
```

Interceptor automatically injects:

```ts
headers.token
```

from localStorage.

---

# 🎨 UI Features

- Responsive Design
- Skeleton Loading
- Toast Notifications
- Reusable Components
- Clean Modern UI
- Client Components Architecture

---

# 📱 Responsive Design

The application is fully responsive across:

- Mobile
- Tablet
- Desktop

---

# ▶️ Getting Started

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

## Build project

```bash
npm run build
```

---

# 🔗 API Base URL

```bash
https://ecommerce.routemisr.com/api/v1
```

---

# 📸 Screenshots

Add screenshots here for:

- Home Page
- Products Page
- Cart Page
- Wishlist Page
- Orders Page
- Profile Page
- Authentication Pages

---

