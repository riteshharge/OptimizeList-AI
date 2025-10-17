import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function AiServiceForAmazonProduct(originalData) {
  const prompt = `You are an expert Amazon product listing optimizer. 
Your goal is to create a fully SEO-optimized, persuasive, and Amazon-compliant product listing using the provided data.

ORIGINAL PRODUCT DATA:
${JSON.stringify(originalData, null, 2)}

=============================
TASK INSTRUCTIONS:
=============================
Generate an improved listing with the following fields. 
Each field must be complete, factual, and well-written — no placeholders, no empty strings.

1. **title** (50–200 characters):
   - Include brand, product type, and main features.
   - Make it keyword-rich, natural, and Amazon-compliant.
   - If missing, generate one from bullets or description.

2. **Description** (150–500 words):
   - Persuasive and detailed.
   - Summarize key benefits, use cases, and customer value.
   - Must sound human, factual, and natural.
   - Avoid exaggerated or promotional claims.

3. **bullet_points** (5–7 total):
   - Each 1–2 sentences, focusing on a single feature or benefit.
   - Use concise, professional language.
   - Begin each point with an action-oriented benefit or key attribute.

4. **features** (100–200 words):
   - Concise overview of the product’s main specs and unique selling points.
   - Highlight what makes it useful, efficient, or innovative.

5. **price**:
   - Keep EXACTLY as in original data (do not modify or format).

6. **keywords** (5–10 total):
   - Include relevant, high-traffic search terms for the product.
   - Avoid repeating words from the title.
   - Use short, lowercase phrases.

=============================
STRICT RULES:
=============================
- All required fields must be present and non-empty.
- Never include markdown, explanations, or commentary.
- Maintain factual accuracy; do not invent technical details.
- Ensure the response is valid JSON — parsable and well-structured.
- Use fluent, natural English that aligns with Amazon’s tone and compliance standards.

=============================
OUTPUT FORMAT (JSON ONLY):
=============================
{
  "title": "Enhanced, keyword-rich product title",
  "Description": "Persuasive and detailed description (150–500 words)",
  "features": "Concise summary of specifications and highlights",
  "bullet_points": [
    "Benefit-focused bullet 1",
    "Benefit-focused bullet 2",
    "Benefit-focused bullet 3",
    "Benefit-focused bullet 4",
    "Benefit-focused bullet 5"
  ],
  "price": "${originalData.price}",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}
`;

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