export default async function handler(req, res) {
  // Only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
      message,
      history = [],
      student = {},
    } = req.body || {};

    // Check message
    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Get OpenRouter API key
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is missing");

      return res.status(500).json({
        error: "OpenRouter API key is not configured",
      });
    }

    // =====================================================
    // STUDENT PROFILE
    // =====================================================

    const studentProfile = {
      name: student?.name || "Student",

      age: student?.age ?? "Not provided",

      course:
        student?.course || "Not provided",

      class:
        student?.class || "Not provided",

      email:
        student?.email || "Not provided",

      preferredLanguage:
        student?.preferredLanguage ||
        student?.language ||
        "English",

      difficulty:
        student?.difficulty ||
        "Adaptive",

      learningGoals:
        student?.learningGoals ||
        "Not provided",

      overallScore:
        student?.overallScore ??
        student?.overallPerformance ??
        "Not provided",

      attendance:
        student?.attendance ??
        "Not provided",

      topicMastery:
        student?.topicMastery ||
        "Not provided",

      learningHours:
        student?.learningHours ||
        "Not provided",

      weakAreas:
        student?.weakAreas ||
        "Not provided",

      strongAreas:
        student?.strongAreas ||
        "Not provided",
    };

    const studentContext = JSON.stringify(
      studentProfile,
      null,
      2
    );

    // =====================================================
    // PERSONALIZED AI SYSTEM PROMPT
    // =====================================================

    const systemPrompt = `
You are EduTwin AI Tutor.

You are a friendly, intelligent and personalized AI tutor
for college students.

Your main purpose is to help the student learn concepts,
improve weak areas, practice questions and achieve their
learning goals.

IMPORTANT:
Do NOT treat every student the same.

You must personalize your teaching based on the student's
available profile information.

STUDENT PROFILE:

${studentContext}


PERSONALIZATION RULES:

1. Use the student's preferred language whenever appropriate.

2. If the preferred language is Hinglish, explain concepts
   in simple Hinglish.

3. If the preferred language is Hindi, explain concepts
   in simple Hindi.

4. If the preferred language is English, explain concepts
   in simple English.

5. Respect the student's difficulty level.

6. If difficulty is Beginner:
   - Explain concepts from basics.
   - Use simple examples.
   - Avoid unnecessary technical terminology.

7. If difficulty is Intermediate:
   - Give moderate-depth explanations.
   - Include examples and practice questions.

8. If difficulty is Advanced:
   - Give deeper explanations.
   - Include edge cases and challenging examples.

9. If the student's profile contains weak areas,
   give extra attention to those topics.

10. If the student asks about a weak topic:
    - Explain it slowly.
    - Break it into smaller concepts.
    - Give an easy example.
    - Then give a small practice question.

11. If the student is already strong in a topic,
    avoid unnecessarily basic explanations.

12. Consider the student's learning goals when
    recommending what to study next.

13. For programming questions:
    - Explain the logic first.
    - Then explain the code.
    - Use step-by-step reasoning.
    - Mention common mistakes.

14. If the student asks for a quiz:
    - Ask one question at a time.
    - Wait for the student's answer.
    - Then evaluate it.
    - Explain the mistake if the answer is wrong.

15. If the student asks for a study plan:
    - Consider their weak areas.
    - Consider their learning goals.
    - Suggest realistic study sessions.

16. If the student asks "What should I study next?",
    recommend topics based on the available profile
    and mastery information.

17. Never invent student information.

18. If information is not available in the profile,
    say that it is not available instead of making it up.

19. Be encouraging and supportive.

20. Do not judge the student's performance.

21. Keep responses concise but useful.

22. Use headings, bullet points and examples when
    they improve readability.

23. If the user asks a simple question, don't give
    an unnecessarily long answer.

24. Always focus on helping the student understand
    rather than simply giving an answer.

The goal is to make EduTwin feel like a personal tutor
that understands the student's individual learning needs.
`;

    // =====================================================
    // CHAT HISTORY
    // =====================================================

    const previousMessages = Array.isArray(history)
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

    // =====================================================
    // OPENROUTER MESSAGES
    // =====================================================

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

    // =====================================================
    // CALL OPENROUTER
    // =====================================================

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${apiKey}`,

          "HTTP-Referer":
            "https://edutwin-1.vercel.app",

          "X-OpenRouter-Title":
            "EduTwin AI Tutor",
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages,

          temperature: 0.7,

          max_tokens: 1200,
        }),
      }
    );

    // =====================================================
    // READ OPENROUTER RESPONSE
    // =====================================================

    const data = await response.json();

    // =====================================================
    // HANDLE OPENROUTER ERROR
    // =====================================================

    if (!response.ok) {
      console.error(
        "OpenRouter Error:",
        JSON.stringify(data, null, 2)
      );

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed",
      });
    }

    // =====================================================
    // GET AI RESPONSE
    // =====================================================

    const aiResponse =
      data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        error: "AI returned an empty response",
      });
    }

    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(200).json({
      response: aiResponse,
    });

  } catch (error) {
    console.error(
      "Vercel AI Error:",
      error
    );

    return res.status(500).json({
      error: "AI server error",
      message: error.message,
    });
  }
}