import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function AiServiceForAmazonProduct(originalData) {
  const prompt = `You are an expert in creating Amazon product listings. 
Your task is to produce a fully optimized, SEO-friendly, and Amazon-compliant product listing based on the input data.

INPUT PRODUCT DATA:
${JSON.stringify(originalData, null, 2)}

=============================
TASK DETAILS:
=============================
Create a refined product listing with the following required fields. 
All fields must be complete, accurate, and well-written. Do not leave any placeholders or empty values.

1. **title** (50–200 characters):
   - Include brand, product type, and main features.
   - Make it natural, keyword-rich, and suitable for Amazon search.
   - If the title is missing, generate one from the bullet points or description.

2. **description** (150–500 words):
   - Persuasive and informative.
   - Highlight key benefits, practical uses, and value for customers.
   - Maintain a factual and natural tone.
   - Avoid exaggeration or unverifiable claims.

3. **bullet_points** (5–7 items):
   - Each bullet should be 1–2 sentences focusing on a single benefit or feature.
   - Use concise, professional language.
   - Start each bullet with an action-oriented benefit or key attribute.

4. **features** (100–200 words):
   - Provide a concise summary of the product’s specifications and standout points.
   - Emphasize what makes it practical, efficient, or unique.

5. **price**:
   - Copy exactly as provided in the original data (do not change formatting).

6. **keywords** (5–10 items):
   - Include relevant, high-traffic search terms.
   - Avoid duplicating words from the title.
   - Use short, lowercase phrases suitable for search optimization.

=============================
RULES TO FOLLOW STRICTLY:
=============================
- Every field must be present and non-empty.
- Output must be valid JSON only — no explanations, comments, or markdown.
- Keep all technical details accurate; do not invent specs.
- Use fluent, natural English aligned with Amazon standards.

=============================
EXPECTED JSON FORMAT:
=============================
{
  "title": "Fully optimized, keyword-rich product title",
  "description": "Detailed, persuasive product description (150–500 words)",
  "features": "Concise summary of specifications and unique points",
  "bullet_points": [
    "Key benefit or feature 1",
    "Key benefit or feature 2",
    "Key benefit or feature 3",
    "Key benefit or feature 4",
    "Key benefit or feature 5"
  ],
  "price": "${originalData.price}",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
`
;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const result = await model.generateContent(prompt);
    let assistantReply = result.response.text().trim();

    // Remove markdown code blocks if present
    assistantReply = assistantReply.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    
    // Find JSON object
    let jsonStart = assistantReply.indexOf("{");
    let jsonEnd = assistantReply.lastIndexOf("}");
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Valid JSON object not found in AI response");
    }
    
    const jsonStr = assistantReply.slice(jsonStart, jsonEnd + 1);
    const parsedData = JSON.parse(jsonStr);

    // Validate and ensure all required fields are present and non-empty
    const validated = {
      title: parsedData.title?.trim() || "Product Title Not Available",
      Description: parsedData.Description?.trim() || parsedData.description?.trim() || 
                   "This product offers quality and value. Please refer to the features and specifications for more details.",
      features: parsedData.features?.trim() || "Features information not available",
      bullet_points: Array.isArray(parsedData.bullet_points) && parsedData.bullet_points.length > 0
        ? parsedData.bullet_points.filter(point => point?.trim())
        : ["Quality product", "Great value", "Reliable performance"],
      price: originalData.price || parsedData.price || "",
      keywords: Array.isArray(parsedData.keywords) && parsedData.keywords.length > 0
        ? parsedData.keywords.filter(kw => kw?.trim()).slice(0, 10)
        : ["product", "quality", "value"],
    };

    // Final check: ensure Description is substantial
    if (validated.Description.length < 50) {
      validated.Description = `This product offers excellent quality and value. ${validated.features} Check out the key features and specifications above for complete details.`;
    }

    return validated;
  } catch (error) {
    console.error("Gemini AI error:", error.message);
    
    // Return fallback structure if AI fails
    return {
      title: originalData.title || "Product Information",
      Description: originalData.features || originalData.bullet_points?.join(". ") || 
                   "Product details are being processed. Please check back soon.",
      features: originalData.features || "Features information available soon",
      bullet_points: originalData.bullet_points?.length > 0 
        ? originalData.bullet_points 
        : ["Quality product", "Customer satisfaction guaranteed"],
      price: originalData.price || "",
      keywords: ["product", "amazon", "quality"],
    };
  }
}
