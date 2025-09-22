# CareerBuddy Frontend 

_CSE-3216 — Software Design Pattern Lab (University of Dhaka)_

This is the **frontend** of the CareerBuddy project. It provides the **user interface** for job seekers and recruiters, built using **React + TypeScript + Vite**.

---

## Features (UI)

- 🔍 **Job Search & Filtering** — Find jobs by skills, location, and preferences  
- 📄 **Resume Builder & Customization** — Create resumes and tailor them for specific roles  
- 📌 **Application Management** — Track job applications and statuses in real time  
- 🔔 **Notifications & Alerts** — Get updates on applications, deadlines, and recommendations  
- 👤 **Profile Management** — Secure login, edit profile, and manage user details  
- 💾 **Saved Jobs & Subscriptions** — Bookmark interesting jobs and subscribe to companies  
- 📬 **Job Alerts via Email/Notifications** — Receive personalized job alerts based on preferences  
- 📊 **Statistics & Dashboard** — View user stats, activity, and progress at a glance  
- 📅 **Calendar & Scheduling** — Manage application deadlines and interviews in one place  

## Tech Stack

- **Frontend Framework:** React (TypeScript + Vite)  
- **Styling:** CSS / Tailwind (if applied)  
- **Build Tool:** Vite  
- **Backend API:** Java (Spring Boot) + PostgreSQL ([CareerBuddy Backend](https://github.com/sheldor944/CareerBuddy_BackEnd-CSE-3216-SDP-Project))  

---

## Setup Instructions

### Prerequisites
- Node.js ≥ 18  
- npm ≥ 9  
- Git ≥ 2.40  

### Installation
```bash
# Clone repo
git clone https://github.com/reckless-meherun/CareerBuddy_FrontEnd-CSE-3216-SDP_Project.git
cd CareerBuddy_FrontEnd-CSE-3216-SDP_Project
```
**Install dependencies**
```
npm install
```
**Running Locally**
```
npm run dev
```
Open in your browser at:
```
http://localhost:3000
```
**Environment Variables**
Create a .env file in the root directory and set the backend API endpoint:
```VITE_API_URL=http://localhost:8080/api```
Make sure the backend is running before using the frontend.

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**Expanding the ESLint configuration**

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
