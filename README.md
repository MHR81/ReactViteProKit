# 🚀 React + Vite Pro Kit

پروژه بیس حرفه‌ای و تمیز React + Vite با تمام تکنولوژی‌های مورد نیاز برای ساخت اپلیکیشن‌های تولیدی.

A clean, professional, and production-ready React + Vite base project with modern technologies and best practices.

---

## ✨ ویژگی‌ها / Features

| ویژگی | توضیح |
|------|------|
| ⚛️ React 19 | جدیدترین ورژن React |
| ⚡ Vite | بندل‌کننده سریع و مدرن |
| 🎨 Tailwind CSS 4 | CSS framework حرفه‌ای |
| 📦 Redux Toolkit | مدیریت state مرکزی |
| 🛡️ Route Protection | محافظت مسیرها |
| 🔐 Authentication | احراز هویت کامل |
| 🌐 PWA Ready | پشتیبانی اپلیکیشن وب |
| 📱 Responsive Design | طراحی واکنش‌پذیر |
| 🧭 React Router v7 | مسیریابی پیشرفته |
| 📧 Axios Integration | درخواست‌های HTTP |
| 🎉 Toast Notifications | پیام‌های اطلاع‌رسانی |
| 🔍 SEO Optimized | بهینه‌سازی برای موتورهای جستجو |

---

## 📁 ساختار پروژه / Project Structure

```
src/
├── main.jsx                      # نقطه ورودی اپلیکیشن
├── App.jsx                       # کامپوننت اصلی
├── index.css                     # استایل‌های عمومی
│
├── layout/                       # بخش‌های اصلی
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── MainLayout/
│       └── MainLayout.jsx
│
├── pages/                        # صفحات
│   ├── Home.jsx
│   ├── About.jsx
│   ├── 404/
│   │   └── NotFound.jsx
│   └── Auth/
│       ├── Login.jsx
│       ├── Register.jsx
│       └── layout/
│           └── AuthLayout.jsx
│
├── components/                   # کامپوننت‌های قابل استفاده مجدد
│   └── Toast.jsx
│
├── Routes/                       # مسیریابی
│   ├── router.jsx
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx
│
├── redux/                        # State Management
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── loadingSlice.js
│       └── toastSlice.js
│
├── services/                     # سرویس‌های API
│   ├── auth.js
│   ├── profile.js
│   └── api/
│       └── base-api.js
│
├── seo/                          # بهینه‌سازی SEO
│   └── Seo.jsx
│
└── assets/                       # فایل‌های استاتیک

public/                           # فایل‌های عمومی
├── vite.svg
└── manifest.json                 # PWA Manifest

index.html                        # فایل HTML اصلی
vite.config.js                    # تنظیمات Vite
eslint.config.js                  # تنظیمات ESLint
package.json                      # وابستگی‌ها و اسکریپت‌ها
tailwind.config.js               # تنظیمات Tailwind
```

---

## 🎯 شروع سریع / Getting Started

### 1️⃣ نصب وابستگی‌ها / Install Dependencies

```bash
npm install
```

### 2️⃣ اجرای سرور توسعه / Run Development Server

```bash
npm run dev
```

سرور در `http://localhost:5173` باز خواهد شد.

### 3️⃣ ساخت نسخه تولید / Build for Production

```bash
npm run build
```

### 4️⃣ مشاهده نسخه تولید / Preview Production Build

```bash
npm run preview
```

### 5️⃣ بررسی کد / Lint Code

```bash
npm lint
```

---

## 🛠️ نحوه استفاده / Usage Guide

### 📍 مسیریابی / Routing

مسیرها در فایل [Routes/router.jsx](Routes/router.jsx) تعریف می‌شوند:

```javascript
// مسیرهای عمومی
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />

// مسیرهای محافظت‌شده (نیاز به لاگین)
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>

// مسیرهای احراز هویت (برای لاگین‌نشده)
<Route element={<AuthRoute />}>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Route>

// صفحه 404
<Route path="*" element={<NotFound />} />
```

### 🔐 احراز هویت / Authentication

توکن خودکار در `localStorage` ذخیره می‌شود:

```javascript
// لاگین
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';

const dispatch = useDispatch();
const response = await authService.login(email, password);
dispatch(setAuth({ token: response.token, user: response.user }));
```

خروج خودکار در صورت `401/403` انجام می‌شود.

### 📡 درخواست‌های API / API Requests

از [services/api/base-api.js](services/api/base-api.js) استفاده کنید:

```javascript
import { apiRequest } from '@/services/api/base-api';

// GET
const data = await apiRequest.get('/endpoint');

// POST
const response = await apiRequest.post('/endpoint', { data });

// PUT
const response = await apiRequest.put('/endpoint/id', { data });

// DELETE
await apiRequest.delete('/endpoint/id');
```

خطاها و موفقیت‌ها خودکار به صورت Toast نمایش داده می‌شوند.

### 🔔 اطلاع‌رسانی‌ها / Toast Notifications

```javascript
import { useDispatch } from 'react-redux';
import { showToast } from '@/redux/slices/toastSlice';

const dispatch = useDispatch();

// نمایش پیام موفقیت
dispatch(showToast({ message: 'عملیات موفق!', type: 'success' }));

// نمایش پیام خطا
dispatch(showToast({ message: 'خطایی رخ داد!', type: 'error' }));

// نمایش پیام اطلاع‌رسانی
dispatch(showToast({ message: 'توجه: ...', type: 'info' }));

// نمایش پیام هشدار
dispatch(showToast({ message: 'احذار: ...', type: 'warning' }));
```

### 🎨 استایل‌گذاری / Styling

Tailwind CSS کامل پیکربندی‌شده است:

```jsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-blue-600">عنوان</h1>
  <p className="text-gray-700 mt-4">توضیح</p>
</div>
```

### 🎨 فایل استایل‌های عمومی / Global Styles (index.css)

فایل [src/index.css](src/index.css) شامل:

- **Tailwind CSS**: تمام کلاس‌های Tailwind فعال‌شده
- **Fonts**: فونت Vazirmatn برای زبان فارسی
- **CSS Variables**: متغیرهای CSS برای رنگ‌ها و تم‌ها
- **Dark Mode**: پشتیبانی حالت تاریک با class `dark`
- **Reset Styles**: بازنشانی استایل‌های پیش‌فرض مرورگر

```css
/* متغیرهای CSS برای روشن */
:root {
  --background: #ffffff;
  --foreground: #020817;
  --primary: #2563eb;
  /* ... سایر متغیرها */
}

/* متغیرهای CSS برای تاریک */
.dark {
  --background: #020817;
  --foreground: #f8fafc;
  /* ... */
}
```

### 🌙 تغییر تم / Dark Mode Toggle

از کامپوننت [components/ToggleTheme.jsx](src/components/ToggleTheme.jsx) برای تبدیل بین حالت روشن و تاریک استفاده کنید:

```javascript
import toggleTheme from '@/components/ToggleTheme';

// فراخوانی تابع برای تغییر تم
const handleThemeToggle = () => {
  toggleTheme();
};
```

**عملکرد:**
- تبدیل میان حالت روشن و تاریک
- ذخیره انتخاب در `localStorage`
- به‌روز‌رسانی خودکار `className` روی عنصر `html`

### 🔌 پیکربندی API / Base API Configuration

فایل [services/api/base-api.js](src/services/api/base-api.js) تمام درخواست‌های HTTP را مدیریت می‌کند:

**ویژگی‌ها:**
- ✅ ارسال خودکار توکن احراز هویت
- ✅ مدیریت خطاهای HTTP
- ✅ نمایش Toast برای خطاها و موفقیت‌ها
- ✅ بارگذاری خودکار (Loading State)
- ✅ خروج خودکار در صورت 401/403
- ✅ پشتیبانی Retry
- ✅ فیلتر کردن Toast برای برخی endpoint‌ها

**پیکربندی:**
```javascript
const BASE_URL = "https://localhost:5173/api";
const TIMEOUT = 600000; // 10 دقیقه
```

**استفاده:**
```javascript
import { apiRequest } from '@/services/api/base-api';

// درخواست‌های معمولی
const data = await apiRequest.get('/users');
const result = await apiRequest.post('/posts', { title: 'نوع' });
const updated = await apiRequest.put('/posts/1', { title: 'بروز‌شده' });
await apiRequest.delete('/posts/1');
```

### 🚫 حذف Toast برای برخی Endpoints / Toast Ignore List

فایل [services/api/ToastIgnore.jsx](src/services/api/ToastIgnore.jsx) شامل لیست endpoint‌هایی است که از نمایش Toast خودکار مستثنی می‌شوند:

```javascript
export const ToastIgnore = [
    // "/posts/like",
    // "/users/check-email",
    // سایر endpoint‌های بدون Toast
];
```

**استفاده:**
اگر نمی‌خواهید برای برخی endpoint‌ها پیام Toast نمایش داده شود، آن endpoint را به این آرایه اضافه کنید. این برای درخواست‌های کوچک یا اختیاری مفید است.

### 📊 State Management

Redux Toolkit برای مدیریت state استفاده می‌شود:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoading } from '@/redux/slices/loadingSlice';

const Component = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.loading);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <div>
      {isAuthenticated && <p>سلام {user.name}</p>}
      {isLoading && <p>در حال بارگذاری...</p>}
    </div>
  );
};
```

### 🔍 SEO Optimization

از کامپوننت [seo/Seo.jsx](seo/Seo.jsx) در هر صفحه استفاده کنید:

```javascript
import Seo from '@/seo/Seo';

const Home = () => {
  return (
    <>
      <Seo
        title="صفحه اصلی"
        description="توضیح صفحه اصلی"
        canonicalUrl="https://example.com/"
      />
      <h1>صفحه اصلی</h1>
    </>
  );
};
```

---

## 📦 وابستگی‌های اصلی / Main Dependencies

| نام | نسخه | توضیح |
|-----|------|------|
| React | 19.2 | کتابخانه UI |
| Vite | 7.2 | بندل‌کننده |
| Tailwind CSS | 4.1 | CSS Framework |
| Redux Toolkit | 2.11 | State Management |
| React Router | 7.10 | مسیریابی |
| Axios | 1.13 | HTTP Client |
| React Helmet Async | 2.0 | SEO Management |
| Framer Motion | 12.23 | انیمیشن‌ها |
| React Icons | 5.5 | آیکون‌ها |
| React Toastify | 11.0 | اطلاع‌رسانی‌ها |
| Vite PWA | 1.2 | PWA Support |

---

## ⚙️ تنظیمات / Configuration

### Tailwind CSS

فایل تنظیمات: `tailwind.config.js`

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
};
```

### Vite

فایل تنظیمات: `vite.config.js`

شامل:
- React Plugin
- Tailwind CSS
- PWA Support
- React Compiler Babel Plugin

### ESLint

فایل تنظیمات: `eslint.config.js`

کنترل کیفیت کد و پیدا کردن مشکلات.

---

## 💡 نکات مهم / Important Notes

✅ توکن احراز هویت خودکار ارسال می‌شود
✅ خطاهای 401/403 خودکار کاربر را logout می‌کنند
✅ Toast messages خودکار 3 ثانیه بعد بسته می‌شوند
✅ PWA برای کار آفلاین آماده است
✅ Tailwind CSS کاملاً قابل سفارشی‌سازی است
✅ Redux DevTools قابل استفاده است (در محیط توسعه)

---

## 🔗 منابع مفید / Useful Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [React Helmet Async](https://github.com/steverep/react-helmet-async)
- [Framer Motion](https://www.framer.com/motion)

---

## 📄 مجوز / License

این پروژه متن‌باز است و برای یادگیری و استفاده در تولید کاملاً آزاد است.

This project is open source and free to use for learning and production purposes.

---

## 👨‍💻 نویسندگان / Authors

ساخته‌شده با ❤️ برای توسعه‌دهندگان React

Built with ❤️ for React developers

---

**آخرین بروزرسانی:** 15 دسامبر 2025

**Last Updated:** December 15, 2025