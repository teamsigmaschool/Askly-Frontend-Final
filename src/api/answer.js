export async function askQuestion(question) {
  const response = await fetch("/api/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": "classroom-user",
      "x-ai-access": "true"
    },
    body: JSON.stringify({ question })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Askly could not answer that question")
  }

  return data.answer
}
