# 🛍️ E-Commerce Store

A modern and fully responsive **E-Commerce Web Application** built with **Next.js (App Router + TypeScript)** featuring secure authentication, dynamic cart & wishlist management, order tracking, profile and address management, reusable UI components, API integration, and a clean scalable architecture for a seamless user experience across all devices.

<div align="center">
  <a href="https://shop-app-eg.netlify.app/" target="_blank">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live_Demo-22c55e?style=for-the-badge&logo=vercel&logoColor=white"/>
  </a>
</div>


---

## 🚀 Overview

This application allows users to:

- 🛍️ Browse and filter products  
- ❤️ Add/remove products from wishlist  
- 🛒 Manage shopping cart  
- 🔐 Register & login securely  
- 🔄 Reset password using verification code  
- 📦 View order history  
- 👤 Manage profile and addresses  

The application includes a fully responsive modern UI with reusable components and API integration.

---

## ✨ Features

### 👤 User Features

- Authentication system  
- Forgot/reset password flow  
- Products filtering by category & brand  
- Shopping cart management  
- Wishlist system  
- Orders history  
- Address management  
- Profile settings  
- Responsive design  
- Toast notifications  

---

## 🔐 Authentication Features

- Register  
- Login  
- Logout  
- Forgot Password  
- Verify Reset Code  
- Reset Password  

Authentication token and user data are stored using `localStorage`.

---

## 🔄 Reset Password Flow

The application supports a complete password recovery flow:

- Send reset code via email  
- Verify reset code  
- Create new password securely  

---

## 🛒 Cart Features

- Add products to cart  
- Increase/decrease quantity  
- Refresh cart count  
- Reset cart state  

---

## ❤️ Wishlist Features

- Add product to wishlist  
- Remove product from wishlist  
- Sync wishlist with API  
- Instant UI updates  

---

## 📦 Orders Features

- Fetch user orders using JWT token  
- Expandable order cards  
- Products summary inside each order  

---

## 👤 Profile Features

### 📍 Addresses

- Add address  
- Edit address  
- Delete address  

### ⚙️ Settings

- Profile information form  
- Change password form  

---

## 🛠️ Tech Stack

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

## 📂 Project Structure

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

## 🎨 UI Features

- Modern responsive design  
- Skeleton loading states  
- Toast notifications  
- Reusable components  
- Clean UI architecture  
- Client Components support  

---

## 📱 Responsive Design

The application is fully responsive across:

- Mobile  
- Tablet  
- Desktop  

---

## 🚀 Getting Started

### Clone Repository

```bash
https://github.com/SamarZeinah/E-commerce.git
```

