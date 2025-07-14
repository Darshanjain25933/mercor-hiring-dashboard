# Mercor Hiring Dashboard

This is a fullstack take-home project for Mercor. The app allows a solo founder or hiring manager to intelligently shortlist top candidates from a large JSON dataset.

## 🚀 Features

- Smart Shortlist: Automatically picks top 5 candidates based on salary, experience, and skills
- Clean table view with:
  - Name, Email, Location
  - Skills, Roles, Salary Expectation
  - Work Experience Count
- Frontend in React.js
- Backend in Node.js (Express)
- Inline CSS for quick styling

## 🧠 Shortlisting Logic

Candidates are shortlisted based on:
- Expected salary under $100,000
- Job roles like “developer” or “engineer”
- At least one listed skill
- 1+ past job experience

## 📦 Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express
- **Data**: JSON file (simulated candidate submissions)

## 📺 Demo Video

[Click here to watch demo](https://drive.google.com/uc?id=13EjVlv92uPEotTBLmaCzaiSeI-SJTCuz&export=download)

## 📂 How to Run

```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd ../frontend
npm install
npm start
