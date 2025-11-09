# **Amazon Product Listing Optimizer Powered by AI**

## **Overview**

This application allows users to optimize Amazon product listings using AI.
Users enter an ASIN, the system fetches the original product details, and AI generates an improved version.
All searches are stored in MongoDB and can be viewed anytime through the History section.

---

## **Backend**

### **Database**

- Uses **MongoDB + Mongoose**
- Stores:

  - ASIN
  - Original product data
  - AI-optimized listing
  - Timestamp

### **Folder Structure**

- `router/` API routes
- `controller/` logic for:

  - Fetching product data
  - AI optimization
  - History retrieval

- `models/` Mongoose schemas
- `config/` MongoDB connection

---

## **Frontend**

Built using **React + Vite**.

### **Key Features**

- ASIN input with suggestions
- Loader while fetching
- Two cards:

  - Original Amazon listing
  - AI-optimized listing

- Search history page
- Responsive and clean UI

---

## **Setup Guide**

### **1. Clone Repository**

```bash
git clone <your-repo-url>
cd OptimizeList-AI
```

### **2. Install Backend Dependencies**

```bash
npm install
```

### **3. Install Frontend Dependencies**

```bash
cd frontend
npm install
```

### **4. Start Backend**

```bash
npm run dev
```

### **5. Start Frontend**

```bash
npm run dev
```

---

## **API Endpoints**

### **Fetch Product by ASIN**

```bash
curl -X POST http://localhost:9003/api/amazon-product \
-H "Content-Type: application/json" \
-d '{"ASIN":"<ASIN_NUMBER>"}'
```

### **Get Search History**

```bash
curl -X GET http://localhost:9003/all-history-product-list
```

---

## **AI Optimization Logic (Gemini)**

### **Title**

- Clear and keyword-rich
- 50–200 characters
- Includes brand + product type + key feature

### **Description**

- Persuasive and helpful
- Uses title, features, highlights, and use cases

### **Bullet Points**

- 5–7 points
- Short, clear, benefit-focused

### **Technical Features**

- Highlights specs
- Easy to scan

### **Keywords**

- 5–10 high-intent keywords

### **Price**

- Always taken from original listing

---
