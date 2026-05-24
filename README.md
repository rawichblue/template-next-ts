# NextTemplate

> **Admin dashboard template** built with Next.js 14 App Router, Ant Design, Redux Toolkit, and Tailwind CSS — ready to fork and extend for any back-office project.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6-0170FE?logo=antdesign)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38BDF8?logo=tailwindcss)

---

## ภาพรวม

โปรเจกต์นี้เป็น **starter template** สำหรับระบบ back-office / admin dashboard ที่พร้อมใช้งานทันที ประกอบด้วยระบบจัดการการชำระเงินเป็นตัวอย่าง พร้อมโครงสร้างที่ขยายต่อได้ง่าย

### หน้าจอหลัก

| หน้า | Path | คำอธิบาย |
|------|------|-----------|
| เข้าสู่ระบบ | `/login` | Form login พร้อม validation |
| รายการชำระเงิน | `/payments` | ตารางข้อมูล + filter + สถิติ |
| รายละเอียด | `/payments/[id]` | ข้อมูลเชิงลึกแต่ละรายการ |
| บันทึกรายการ | `/payments/form` | Form สร้าง/แก้ไขรายการ |
| รายงาน | `/reports` | สรุปสถิติภาพรวม |
| ตั้งค่าระบบ | `/settings` | ตั้งค่าทั่วไปและการแจ้งเตือน |
| โปรไฟล์ | `/profile` | ข้อมูลบัญชีผู้ใช้ |

---

## Features

- **Dark / Light mode** — สลับธีมได้ทันที ใช้ Tailwind `class` strategy + Ant Design dark algorithm
- **Collapsible sidebar** — ยุบ/ขยาย sidebar พร้อม animation; content margin ปรับตาม
- **Auth guard** — route group `(auth)` / `(app)` แยก layout ชัดเจน; redirect อัตโนมัติ
- **Redux state management** — Redux Toolkit + thunks สำหรับ async data fetching
- **Filter & pagination** — ค้นหา/กรองข้อมูล พร้อมล้างค่า (แก้ stale-closure bug แล้ว)
- **Notification panel** — bell icon เปิด popover แสดงการแจ้งเตือน พร้อม unread badge
- **Responsive** — รองรับ mobile ด้วย drawer sidebar + hamburger menu
- **Mock service layer** — สลับระหว่าง mock data และ real API ได้โดยไม่แก้ logic

---

## Tech Stack

```
Next.js 14 (App Router)
├── TypeScript 5
├── Ant Design 6          UI component library
├── Tailwind CSS 3        utility-first styling
├── Redux Toolkit 2       global state + async thunks
├── Axios                 HTTP client
└── Day.js               date formatting
```

---

## โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── (auth)/           # layout สำหรับหน้า login
│   │   └── login/
│   └── (app)/            # layout หลัก (sidebar + header)
│       ├── payments/
│       │   ├── [id]/     # หน้ารายละเอียด
│       │   └── form/     # หน้าบันทึกรายการ
│       ├── reports/
│       ├── settings/
│       └── profile/
├── components/
│   ├── layout/           # AppShell, AppHeader, Sidebar, AppFooter
│   └── common/           # DataTable, FilterCard, StatusBadge, Modal, PageHeader
├── modules/              # feature-level UI (payments, auth)
├── store/
│   └── slices/           # Redux slices (payments, common)
├── hooks/                # usePayments, useAppDispatch, useAppSelector
├── services/             # API client + mock data
├── contexts/             # AuthContext, ThemeContext
├── types/                # TypeScript interfaces
├── constants/            # table columns, page config
└── utils/                # date, format helpers
```

---

## เริ่มต้นใช้งาน

### 1. Clone & Install

```bash
git clone <repo-url>
cd template-next-ts
npm install
```

### 2. ตั้งค่า Environment

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. รัน Dev Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) — จะ redirect ไปหน้า login อัตโนมัติ

### ข้อมูล Login (mock)

```
Email:    admin@example.com
Password: password
```

---

## Scripts

| Command | คำอธิบาย |
|---------|-----------|
| `npm run dev` | รัน dev server |
| `npm run build` | build สำหรับ production |
| `npm run start` | รัน production server |
| `npm run lint` | ตรวจ ESLint |

---

## สลับ Mock ↔ Real API

ไฟล์ [`src/services/payments.service.ts`](src/services/payments.service.ts) ใช้ mock data เป็นค่าเริ่มต้น เมื่อต่อ API จริงให้แทนที่ฟังก์ชันใน service โดยไม่ต้องแก้ Redux thunks หรือ hooks

```ts
// mock (ค่าเริ่มต้น)
import { getMockList } from './payments.mock';

// real API — แทนที่ด้วย
const res = await api.get('/payments', { params });
```

---

## Architecture Decisions

| เรื่อง | การตัดสินใจ |
|--------|-------------|
| Route groups | แยก `(auth)` / `(app)` เพื่อให้แต่ละกลุ่มมี layout เป็นของตัวเอง |
| State management | Redux Toolkit — เหมาะกับ filter + pagination state ที่แชร์ข้าม component |
| Sidebar collapse | `collapsed` state อยู่ที่ `AppShell` เพื่อให้ content margin ปรับตามได้ |
| Theme | `ThemeContext` ห่อ Ant Design `ConfigProvider` + toggle `dark` class บน `<html>` |
| Filter reset | ส่ง `{ ...EMPTY_FILTER, page: 0 }` โดยตรงเพื่อหลีกเลี่ยง stale closure ใน `useCallback` |

---

## License

MIT
