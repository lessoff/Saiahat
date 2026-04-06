import Groq from "groq-sdk";
import { getUser } from "@/lib/auth/get-user";
import { db } from "@/db";
import { tours } from "@/db/schema";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const { messages }: { messages: Message[] } = await request.json();

  if (!messages || messages.length === 0) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }

  const [user, allTours] = await Promise.all([
    getUser(),
    db.select().from(tours),
  ]);

  const toursContext = allTours
    .map(
      (t) =>
        `- ${t.title}: ${t.location}, ${t.duration}, difficulty: ${t.difficulty}, price: ${Number(t.price).toLocaleString()} KZT/person, max group: ${t.maxGroupSize ?? "flexible"}. ${t.description.slice(0, 200)}`
    )
    .join("\n");

  const userContext = user
    ? `The user is logged in as ${user.name || user.email}. Address them by name when it feels natural.`
    : `The user is not logged in. If they want to book a tour, let them know they need to sign up first.`;

  const systemPrompt = `You are Saiahat Assistant, a friendly and knowledgeable tour guide chatbot for Saiahat — a tour booking platform in Kazakhstan.

${userContext}

Here are all currently available tours:
${toursContext}

Guidelines:
- Help users find the right tour based on their preferences, fitness level, budget, or interests
- Answer questions about tour details, pricing, difficulty, locations, and group sizes
- Prices are in KZT (Kazakhstani Tenge)
- Keep responses concise, warm, and helpful — avoid long walls of text
- To book: users click a tour card on the site and fill out the booking form
- For cancellations: users should contact support through the site
- If asked something unrelated to tours or Kazakhstan travel, politely redirect back to tours
- Do not make up tours or details not listed above`;

  try {
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (err) {
          console.error("[/api/chat] Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[/api/chat] Groq error:", err);
    return Response.json({ error: "AI service error" }, { status: 502 });
  }
}
