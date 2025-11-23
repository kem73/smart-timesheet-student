<h1 align="center">📚 Smart Timesheet — Angular 19 Demo</h1>

<p align="center">
  A clean, scalable student timetable application built with modern Angular architecture, standalone components, and a mock backend.
</p>

---

## ✨ Overview

This project is a **demo Angular 19 application** that showcases a smart student timetable system using:

- ⚡ **Standalone Components**
- 🧠 **Facade & Strategy Architectural Patterns**
- 🪝 **Custom HTTP Interceptor** (adds encrypted `sessionID` header via `btoa()`)
- 🔌 **Lazy-loaded routing**
- 🗄️ **Mock backend** using `server.js + db.json`

---

## 🚀 Core Features

| Feature | Description |
|---------|------------|
| **Student Listing** | View all students on the home page |
| **Search by Student ID** | Valid → navigate to timetable, Invalid → error message |
| **Smart Timetable** | Highlights *current* and *next* class dynamically |
| **Auto Session Handling** | Interceptor injects encrypted session header |
| **Extensible Data Layer** | Swappable strategies for mock/real APIs |

---

## 🏗️ Architecture

This project focuses on clean layering and extensibility:

| Layer | Responsibility |
|-------|----------------|
| **Facade** | Exposes reactive streams & UI data |
| **Strategy** | Data implementations (mock backend now, real API later) |
| **Interceptor** | Handles session header logic |
| **Mock Backend** | Node server simulating real requests |

> The design makes it easy to switch between mock data and real APIs without refactoring UI components.

---

## 🗄️ Backend Setup

This project ships with a lightweight mock backend.

| File | Purpose |
|------|---------|
| `db.json` | Acts as the database |
| `server.js` | Custom Node server enabling GET + POST requests |

Unlike standard `json-server`, this setup supports custom behavior and session handling.

---

## 🔧 Development Setup

### 1️⃣ Start Angular App
ng serve

### 2️⃣ Start Mock Backend
node server.js

### 🌍 Open the App
http://localhost:4200/


Live reload is enabled automatically.