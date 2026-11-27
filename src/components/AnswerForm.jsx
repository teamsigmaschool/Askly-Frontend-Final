import { useState } from "react"
import { askQuestion } from "../api/answer.js"

export default function AnswerForm() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    if (!question.trim() || loading) return

    setLoading(true)
    setAnswer("")
    setError("")

    try {
      setAnswer(await askQuestion(question.trim()))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      <label htmlFor="question" className="form-label">Your question</label>
      <textarea
        id="question"
        className="form-control"
        rows="5"
        maxLength="500"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Why does the moon change shape?"
      />
      <div className="form-footer">
        <span>{question.length}/500</span>
        <button className="btn btn-success" type="submit" disabled={loading || !question.trim()}>
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>
      {error && <p className="message error-message">{error}</p>}
      {answer && <div className="message answer-message"><strong>Answer</strong><p>{answer}</p></div>}
    </form>
  )
}
