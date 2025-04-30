import { NextResponse } from "next/server"
import { generateAIResponse, findRelevantDocuments, createContextFromDocuments } from "@/lib/ai-service"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1].content

    // Relevante Dokumente finden
    const documents = await findRelevantDocuments(latestMessage)

    // Kontext aus den gefundenen Dokumenten erstellen
    const context = createContextFromDocuments(documents)

    // Konversationsverlauf aufbauen (nur die letzten 5 Nachrichten)
    const conversationHistory = messages
      .slice(-5)
      .map((m: any) => `${m.role === "user" ? "Benutzer" : "Assistent"}: ${m.content}`)
      .join("\n")

    // System-Prompt mit Kontext und Konversationsverlauf
    const systemPrompt = `
      Du bist ein hilfreicher Assistent für unser Unternehmen.
      
      KONVERSATIONSVERLAUF:
      ${conversationHistory}
      
      UNTERNEHMENSKONTEXT:
      ${context}
      
      Beantworte die Frage des Benutzers basierend auf dem bereitgestellten Unternehmenskontext.
      Wenn du die Antwort nicht im Kontext findest, sage ehrlich, dass du es nicht weißt, aber biete an, bei der Suche nach der Information zu helfen.
      Verweise auf relevante Dokumente oder Anleitungen, wenn möglich.
      Halte deine Antworten präzise, hilfreich und freundlich.
      Antworte auf Deutsch.
    `

    // Antwort generieren
    const response = await generateAIResponse(latestMessage, systemPrompt)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Fehler in der Chat-API:", error)
    return NextResponse.json(
      {
        response: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      },
      { status: 200 }, // Status 200 statt 500, damit der Client die Antwort verarbeiten kann
    )
  }
}
