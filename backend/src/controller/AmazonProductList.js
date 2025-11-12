import { chromium } from "playwright";

import "../../MongoConnections.js";

import { AiServiceForAmazonProduct } from "../ai/useaiService.js";
import Product from "../models/Product.js";

export async function AmazonProductList(req, res) {
  const { ASIN } = req.body;

  if (!ASIN) {
    return res
      .status(400)
      .json({ success: false, message: "ASIN is required." });
  }

  const asinRegex = /^[A-Z0-9]{10}$/;
  if (!asinRegex.test(ASIN)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ASIN format." });
  }

  try {
    const url = `https://www.amazon.in/dp/${ASIN}`;
    const browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Scrape original data
    const title = await page
      .$eval("#productTitle", (el) => el.textContent.trim())
      .catch(() => "");

    const price = await page
      .$eval(".a-price-whole", (el) => el.textContent.trim())
      .catch(() => "");

    const features = await page
      .$eval("#feature-bullets", (el) => el.innerText.trim())
      .catch(() => "");

    await browser.close();

    const bulletPoints = features
      ? features.split("\n").filter((line) => line.trim() !== "")
      : [];

    const originalData = {
      asin: ASIN,
      title: title || "",
      Description: "",
      features: features || "",
      bullet_points: bulletPoints,
      price: price || "",
    };

    const hasMinimalData = title || features || bulletPoints.length > 0;

    let optimizedData;
    if (!hasMinimalData) {
      optimizedData = {
        title: "",
        Description: "",
        features: "",
        bullet_points: [],
        price: "",
        keywords: [],
      };
    } else {
      optimizedData = await AiServiceForAmazonProduct(originalData);
      optimizedData.price = originalData.price;
    }

    // ✅ MongoDB Upsert
    await Product.findOneAndUpdate(
      { asin: ASIN },
      {
        asin: ASIN,
        original_data: originalData,
        optimized_data: optimizedData,
        timestamp: new Date(),
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      asin: ASIN,
      original: originalData,
      optimized: optimizedData,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({
      success: false,
      message: `Unable to fetch or process product for ASIN ${ASIN}`,
      error: error.message,
    });
  }
}
