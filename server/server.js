import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY is missing in .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());


// ================================
// HOME / HEALTH CHECK
// ================================

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "EduTwin AI Mentor is running",
  });
});


// ================================
// AI MENTOR
// ================================

app.post("/api/mentor", async (req, res) => {
  try {
    const {
      message,
      history = [],
      student = {},
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }


    // ================================
    // STUDENT INFORMATION
    // ================================

    const studentName =
      student?.name || "Student";

    const language =
      student?.language || "English";

    const weakAreas =
      Array.isArray(student?.weakAreas)
        ? student.weakAreas.join(", ")
        : "Not provided";

    const strongAreas =
      Array.isArray(student?.strongAreas)
        ? student.strongAreas.join(", ")
        : "Not provided";


    // ================================
    // SYSTEM PROMPT
    // ================================

    const systemPrompt = `
You are EduTwin AI Tutor.

You are a friendly, intelligent and personalized AI tutor for college students.

Student Information:
Name: ${studentName}
Preferred Language: ${language}
Weak Areas: ${weakAreas}
Strong Areas: ${strongAreas}

Your responsibilities:

1. Explain concepts in very simple language.
2. Give practical examples whenever useful.
3. For programming questions, explain step by step.
4. If the student asks for Hindi, respond in Hindi.
5. If the student asks for Hinglish, respond in Hinglish.
6. If the student asks for a quiz, ask one question at a time.
7. Adapt explanations according to the student's weak areas.
8. If the student makes a mistake, explain the mistake clearly.
9. Help the student understand instead of simply giving answers.
10. Keep responses suitable for a college student.
11. Be concise but useful.
12. Do not unnecessarily use complicated terminology.
`;


    // ================================
    // CHAT HISTORY
    // ================================

    const previousMessages =
      Array.isArray(history)
        ? history
            .filter(
              (msg) =>
                msg &&
                msg.text &&
                typeof msg.text === "string"
            )
            .slice(-10)
            .map((msg) => ({
              role: msg.isUser
                ? "user"
                : "assistant",

              content: msg.text,
            }))
        : [];


    // ================================
    // FINAL MESSAGE ARRAY
    // ================================

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...previousMessages,

      {
        role: "user",
        content: message.trim(),
      },
    ];


    // ================================
    // OPENROUTER API
    // ================================

    console.log("🤖 Sending request to OpenRouter...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${OPENROUTER_API_KEY}`,

          "HTTP-Referer":
            "http://localhost:5173",

          "X-OpenRouter-Title":
            "EduTwin AI Tutor",
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages: messages,

          temperature: 0.7,

          max_tokens: 1200,
        }),
      }
    );


    // ================================
    // READ RESPONSE
    // ================================

    const data = await response.json();


    // ================================
    // OPENROUTER ERROR
    // ================================

    if (!response.ok) {

      console.error(
        "❌ OpenRouter Error:"
      );

      console.error(
        JSON.stringify(
          data,
          null,
          2
        )
      );

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed",
      });
    }


    // ================================
    // GET AI RESPONSE
    // ================================

    const aiResponse =
      data?.choices?.[0]?.message?.content;


    if (!aiResponse) {

      console.error(
        "❌ Empty AI response"
      );

      console.error(
        JSON.stringify(
          data,
          null,
          2
        )
      );

      return res.status(500).json({
        error:
          "AI returned an empty response",
      });
    }


    // ================================
    // SUCCESS
    // ================================

    console.log(
      "✅ OpenRouter response received"
    );

    res.json({
      response: aiResponse,
    });

  } catch (error) {

    console.error(
      "❌ Server Error:"
    );

    console.error(error);

    res.status(500).json({
      error: "AI server error",
      message: error.message,
    });
  }
});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {

  console.log("");
  console.log(
    "🚀 EduTwin AI Mentor running on port " +
    PORT
  );

  console.log(
    "🤖 Provider: OpenRouter"
  );

  console.log(
    "🆓 Model: openrouter/free"
  );

  console.log("");
});