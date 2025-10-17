Amazon Product Listing Optimizer Using AI
Project Summary

This application helps users retrieve product details from Amazon using ASIN numbers and generates an AI-optimized version of the product listing. Users can also review their search history and compare original and enhanced product information side by side.

Backend Structure
Database

Uses MySQL to store product details.

Contains a products table to save original and AI-optimized product data.

Folder Organization

router/ → Handles API endpoints.

controller/ → Implements core business logic:

Fetching product data using ASIN

Retrieving search history

config/ → Database configuration and table setup.

Frontend Structure

Built using React (initialized with Vite for fast setup).

Components:

ASIN Input Component:

Input field for ASIN numbers

Submit button triggers async fetch

Loader animation while fetching data

Product Cards:

One card for original product details

One card for AI-optimized data

Footer Component:

Displays most frequently searched keywords

History Component:

Shows previously searched ASINs with most recent first

Hovering over entries shows the full ASIN

Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd OptimizeList-AI

2. Backend Dependencies
npm install

3. Frontend Dependencies
cd frontend
npm install

4. Start Servers

Backend:

npm run dev


Frontend:

npm run dev

API Endpoints

Fetch Product by ASIN

curl -X POST http://localhost:9003/api/amazon-product \
-H "Content-Type: application/json" \
-d '{"ASIN":"<ASIN_NUMBER>"}'


Get All Search History

curl -X GET http://localhost:9003/all-history-product-list

Gemini AI Optimization Prompt Overview

The AI is guided by specific rules to produce structured and effective product listings:

Title:

Keyword-rich, 50–200 characters

Includes brand, product type, and key features

Generated from bullet points if missing

Description:

Persuasive, detailed, never empty

Created using title, features, highlights, and use cases

Bullet Points:

5–7 points, concise and clear

1–2 sentences each

Highlights product significance

Features:

Key technical aspects or unique selling points

Easy to scan and informative

Price:

Preserves the original product price

Keywords:

5–10 relevant keywords

Focused on search terms related to the title

