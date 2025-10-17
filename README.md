# Amazon Product Listing with AI

## Project Overview
This project allows users to fetch Amazon product details using ASIN numbers and receive an AI-generated optimized version alongside the original product data. Users can also view their search history and track previously searched ASINs.

---

## Backend Structure

### Database
- **MySQL** connection established
- **`products` table** created to store product details

### Folders
- **`router/`** → API routes
- **`controller/`** → Business logic for:
  - Searching product data
  - Retrieving search history
- **`config/`** → Database table setup and configuration

---

## Frontend Structure
- Built with **React** using **Vite** for fast setup

### Components
- **Centralized Input Component**
  - ASIN input box
  - Submit button triggers asynchronous product fetch
  - Loader animation displayed until data is fetched
- **Product Cards**
  - Two side-by-side cards displaying:
    - Original product data
    - AI-optimized product data
- **Footer Component**
  - Displays frequently used search keywords
- **View History Component**
  - Displays previously searched ASINs (most recent on top)
  - Hover to see full ASIN

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
API Testing
Fetch product by ASIN

bash
curl -X POST http://localhost:9003/api/amazon-product \
-H "Content-Type: application/json" \
-d '{"ASIN":"<ASIN_NUMBER>"}'
Get all search history

bash
curl -X GET http://localhost:9003/all-history-product-list
Gemini AI Prompt Overview
The AI generates structured and optimized product data following these rules:

Title

Keyword-rich, 50–200 characters

Includes brand, product type, and key features

Generated from bullet points/features if missing

Description

Detailed and persuasive

Uses title, features, highlights, and use cases

Bullet Points

5–7 concise and clear points

One or two sentences each

Emphasizes product significance

Features

Highlights technical aspects or unique selling points

Informative and scannable

Price

Uses original product price only

Keywords

5–10 relevant keywords

Focused on search terms related to the title
