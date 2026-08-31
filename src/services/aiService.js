const API_URL = "/api/mentor";

const aiService = {
  async chat(message, history = [], student = {}) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history,
        student,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error || "AI Tutor request failed"
      );
    }

    return data.response;
  },
};

export default aiService;