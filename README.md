# Amazon Product Listing Optimizer Using AI

## Project Summary
This application allows users to fetch product details from Amazon using ASIN numbers and generates an AI-optimized version of the product listing. Users can also view their search history and compare original and AI-enhanced data side by side.

---

## Backend Structure

### Database
- Uses **MySQL** to store product details.
- Contains a **`products` table** to save both original and AI-optimized data.

### Folder Organization
- **`router/`** → Handles API endpoints.
- **`controller/`** → Implements core business logic:
  - Fetching product data using ASIN
  - Retrieving search history
- **`config/`** → Database configuration and table setup.

---

## Frontend Structure
- Built with **React** (Vite setup for fast development).

### Components
- **ASIN Input Component**
  - Input box for ASIN
  - Submit button to fetch product data asynchronously
  - Loader animation while fetching
- **Product Cards**
  - One card for original product details
  - One card for AI-optimized product data
- **Footer Component**
  - Displays frequently used search keywords
- **History Component**
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
कोड कॉपी करणे
npm install
3. Install frontend dependencies
bash
कोड कॉपी करणे
cd frontend
npm install
4. Start the servers
Backend

bash
कोड कॉपी करणे
npm run dev
Frontend

bash
कोड कॉपी करणे
npm run dev
API Endpoints
Fetch product by ASIN

bash
कोड कॉपी करणे
curl -X POST http://localhost:9003/api/amazon-product \
-H "Content-Type: application/json" \
-d '{"ASIN":"<ASIN_NUMBER>"}'
Get all search history

bash
कोड कॉपी करणे
curl -X GET http://localhost:9003/all-history-product-list
Gemini AI Optimization Rules
The AI generates structured and effective product listings based on these rules:

Title

Keyword-rich, 50–200 characters

Includes brand, product type, and key features

If missing, generated from bullet points/features

Description

Detailed and persuasive

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
