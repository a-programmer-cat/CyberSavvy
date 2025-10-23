export async function sendMessageToGPT(message: string) {
  const apiKey = process.env.VITE_OPENAI_API_KEY;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are CyberSavvy, an AI assistant that helps Malaysians learn about cybersecurity. Always answer clearly and in simple terms.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn’t get a reply.";
}