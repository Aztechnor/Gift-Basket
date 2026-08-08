import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { RecommendedProduct } from "@/lib/conversational-ai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PRODUCT_CATALOG = [
  {
    id: 1,
    name: "Premium Gift Collection",
    price: 15600,
    image: "/images/hero-product.png",
    category: "Premium",
    rating: 4.9,
    quickReason: "Perfect for special occasions",
  },
  {
    id: 2,
    name: "Traditional Ruracio Set",
    price: 22000,
    image: "/placeholder.jpg",
    category: "Cultural",
    rating: 4.8,
    quickReason: "Authentic Kenyan tradition",
  },
  {
    id: 3,
    name: "Baby Essentials Bundle",
    price: 12500,
    image: "/placeholder.jpg",
    category: "Baby Shower",
    rating: 4.9,
    quickReason: "Everything new parents need",
  },
  {
    id: 4,
    name: "Corporate Executive Box",
    price: 18000,
    image: "/placeholder.jpg",
    category: "Corporate",
    rating: 4.7,
    quickReason: "Professional and impressive",
  },
  {
    id: 5,
    name: "Skincare Glow Kit",
    price: 8500,
    image: "/placeholder.jpg",
    category: "Self-Care",
    rating: 4.8,
    quickReason: "Rejuvenating and relaxing",
  },
  {
    id: 6,
    name: "Artisan Chocolate Box",
    price: 4500,
    image: "/placeholder.jpg",
    category: "Sweet Treats",
    rating: 4.9,
    quickReason: "Decadent handcrafted chocolates",
  },
  {
    id: 7,
    name: "Get Well Soon Care Package",
    price: 6500,
    image: "/placeholder.jpg",
    category: "Care",
    rating: 4.7,
    quickReason: "Comforting items for recovery",
  },
  {
    id: 8,
    name: "Period Care Package",
    price: 5500,
    image: "/placeholder.jpg",
    category: "Care",
    rating: 4.8,
    quickReason: "Comforting essentials and treats",
  },
  {
    id: 9,
    name: "Gourmet Coffee Hamper",
    price: 7200,
    image: "/placeholder.jpg",
    category: "Food & Drink",
    rating: 4.9,
    quickReason: "Premium locally roasted beans",
  },
];

const USER_PROFILE = {
  name: "Alex",
  history: [
    { recipient: "James", relationship: "Partner", lastGift: "Artisan Chocolate Box", date: "Last Year" },
    { recipient: "Mum", relationship: "Mother", lastGift: "Flowers", date: "Last Mother's Day" },
    { recipient: "Sarah", relationship: "Sister", lastGift: "Luxury Spa Hamper", date: "2 months ago" }
  ]
};

const SYSTEM_PROMPT = `You are a helpful, contextual AI Gift Advisor for GiftBasket.
You understand the current occasion, recipient, relationship, recipient preferences, previous gifts, budget, and product catalogue.

You have access to the user's profile:
User Name: ${USER_PROFILE.name}
Saved People & Gifting History:
${JSON.stringify(USER_PROFILE.history, null, 2)}

Product Catalog (NEVER invent products, only recommend from this list):
${JSON.stringify(PRODUCT_CATALOG, null, 2)}

Guidelines:
1. If the user mentions a specific person (e.g., James, Mum, Sarah), use the saved history. For example, if they say James, you can mention he liked the chocolate box last year.
2. If they mention everyday occasions like "She isn't feeling well", "cheer him up", "girlfriend has cramps", recommend appropriate care packages using respectful, non-medical language.
3. NEVER invent products. Only use the provided catalog.
4. Output your response strictly in the provided JSON schema.

Schema requirements:
- content: Your conversational reply to the user.
- productIds: Array of product IDs from the catalog you recommend based on their request.
- suggestions: Quick reply suggestions for the user to click.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] },
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            content: { type: "STRING" },
            productIds: {
              type: "ARRAY",
              items: { type: "INTEGER" }
            },
            suggestions: {
              type: "ARRAY",
              items: { type: "STRING" }
            }
          },
          required: ["content", "productIds", "suggestions"]
        }
      }
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);

    // Map product IDs to full product objects
    const recommendedProducts = (parsed.productIds || [])
      .map((id: number) => PRODUCT_CATALOG.find(p => p.id === id))
      .filter(Boolean);

    return NextResponse.json({
      content: parsed.content,
      products: recommendedProducts,
      suggestions: parsed.suggestions
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
