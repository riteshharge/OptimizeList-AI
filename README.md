# Amazon Product Listing Optimizer Using AI

![Project Badge](https://img.shields.io/badge/status-active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-React_Node.js_MySQL-blue)

---

## Project Summary
This project allows users to fetch Amazon product details using ASIN numbers and get an AI-optimized version of the product listing. Users can also view their search history and compare original and enhanced product data side by side.

---

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **AI:** Google Gemini / OpenAI

---

## Backend Structure

### Database
- Uses **MySQL** to store product details.
- Contains a **`products` table** to save both original and AI-optimized product data.

### Folder Organization
- **`router/`** → API endpoints
- **`controller/`** → Business logic for:
  - Fetching product data using ASIN
  - Retrieving search history
- **`config/`** → Database configuration and table setup

---

## Frontend Structure

### Components
- **ASIN Input Component**
  - Input box for ASIN
  - Submit button triggers async fetch
  - Loader animation while fetching
- **Product Cards**
  - One card for original product details
  - One card for AI-optimized product data
- **Footer Component**
  - Displays frequently used search keywords
- **History Component**
  - Shows previously searched ASINs (most recent on top)
  - Hovering shows full ASIN

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd OptimizeList-AI
2. Install backend dependencies
bash
npm install
3. Install frontend dependencies
bash
cd frontend
npm install
4. Start the servers
Backend

bash
npm run dev
Frontend

bash
npm run dev
API Endpoints
Fetch product by ASIN

bash
curl -X POST http://localhost:9003/api/amazon-product \
-H "Content-Type: application/json" \
-d '{"ASIN":"<ASIN_NUMBER>"}'
Get all search history

bash
curl -X GET http://localhost:9003/all-history-product-list
Gemini AI Optimization Rules
Title

Keyword-rich, 50–200 characters

Includes brand, product type, and key features

If missing, generated from bullet points/features

Description

Detailed, persuasive

Created using title, features, highlights, and use cases

Bullet Points

5–7 clear and concise points

1–2 sentences each

Emphasizes product significance

Features

Highlights technical aspects or unique selling points

Informative and scannable

Price

Uses the original product price only

Keywords

5–10 relevant keywords

Focused on search terms similar to the title
